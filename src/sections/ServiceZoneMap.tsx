'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Service Coverage Data with specific colors for the "Outlines"
const SERVICE_ZONES = [
  { city: 'Namakkal', lat: 11.2189, lng: 78.1674, color: '#FACC15', radius: 25000, label: 'Primary Centre', isPrimary: true },
  { city: 'Salem', lat: 11.6643, lng: 78.1460, color: '#3B82F6', radius: 18000, label: 'Secondary Node' },
  { city: 'Karur', lat: 10.9601, lng: 78.0766, color: '#22C55E', radius: 15000, label: 'Secondary Node' },
  { city: 'Trichy', lat: 10.7905, lng: 78.7047, color: '#F97316', radius: 18000, label: 'Secondary Node' },
  { city: 'Erode', lat: 11.3410, lng: 77.7172, color: '#C084FC', radius: 18000, label: 'Secondary Node' },
];


// Connection Lines from Primary Hub (Namakkal) to Nodes
const CONNECTIONS = [
  { fromId: 0, toId: 1 }, // Namakkal to Salem
  { fromId: 0, toId: 2 }, // Namakkal to Karur
  { fromId: 0, toId: 3 }, // Namakkal to Trichy
  { fromId: 0, toId: 4 }, // Namakkal to Erode
];

function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return;

    // Inject Leaflet CSS
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    import('leaflet').then((L) => {
      if (!isMounted || !mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [11.2189, 78.1674],
        zoom: 8,
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: false,
      });
      mapInstanceRef.current = map;

      // Cyber-Tactical Dark Tiles (CartoDB Dark Matter with CSS Filter)
      const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        alt: 'Dark themed map tile showing service coverage',
        title: 'Dark themed map tile showing service coverage',
      } as any);
      tiles.addTo(map);

      // Force a tactical blue/slate tint via CSS filter on the tile layer's container
      const tileContainer = tiles.getContainer();
      if (tileContainer) {
        tileContainer.style.filter = 'hue-rotate(15deg) brightness(1.6) contrast(1.2) saturate(0.9)';
      }

      // ── Local boundaries.json ─────────────────────────────────────────
      fetch('/boundaries.json')
        .then((r) => r.json())
        .then((boundaries) => {
          if (!isMounted) return;

          // 1. Draw Tamil Nadu State Boundary
          const tnGeometry = boundaries['Tamil Nadu'];
          if (tnGeometry) {
            L.geoJSON({ type: 'Feature', geometry: tnGeometry, properties: {} } as any, {
              style: {
                color:       '#FACC15',
                weight:      2.5,
                opacity:     0.6,
                fillColor:   '#FACC15',
                fillOpacity: 0.15,
                dashArray:   '5, 10'
              },
            } as import('leaflet').GeoJSONOptions).addTo(map);
          }

          // 2. Draw District Boundaries
          SERVICE_ZONES.forEach((zone) => {
            const boundaryKey = zone.city === 'Trichy' ? 'Tiruchirappalli' : zone.city;
            const geom = boundaries[boundaryKey];
            if (geom) {
              L.geoJSON({ type: 'Feature', geometry: geom, properties: {} } as any, {
                style: {
                  color:       zone.color,
                  weight:      2.5,
                  opacity:     0.6,
                  fillColor:   zone.color,
                  fillOpacity: 0.35,
                  dashArray:   '5, 10'
                },
              } as import('leaflet').GeoJSONOptions).addTo(map);
            }
          });
        })
        .catch((e) => console.error('Failed to load local boundaries:', e));


      // Add Connection Network Lines
      CONNECTIONS.forEach((conn) => {
        const from = SERVICE_ZONES[conn.fromId];
        const to = SERVICE_ZONES[conn.toId];

        L.polyline([[from.lat, from.lng], [to.lat, to.lng]], {
          color: '#FACC15',
          weight: 2,
          opacity: 0.6,
          dashArray: '8, 12',
          className: 'map-network-line'
        }).addTo(map);
      });

      // Add Coverage Circles with Outlines
      SERVICE_ZONES.forEach((zone) => {
        // The "Coverage Area" Circle
        L.circle([zone.lat, zone.lng], {
          radius: zone.radius,
          color: zone.color,
          weight: 3, // Thicker outline as requested
          opacity: 0.8,
          fillColor: zone.color,
          fillOpacity: 0.1,
          dashArray: zone.isPrimary ? undefined : '5, 5'
        }).addTo(map);

        // Marker for each city
        const icon = L.divIcon({
          className: 'custom-modern-marker',
          html: `
            <div class="map-marker-container" style="--marker-color: ${zone.color}" role="img" aria-label="${zone.city} - ${zone.label}">
              <div class="map-marker-pulse"></div>
              <div class="map-marker-pulse" style="animation-delay: 0.8s"></div>
              <div class="map-marker-pulse" style="animation-delay: 1.6s"></div>
              <div class="map-marker-core"></div>
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        L.marker([zone.lat, zone.lng], { icon, title: `${zone.city} - ${zone.label}` })
          .addTo(map)
          .bindPopup(`
            <div class="hud-popup-content">
              <p class="hud-popup-label">${zone.label}</p>
              <h3 class="hud-popup-title text-brand-accent">${zone.city}</h3>
              <div class="hud-popup-bar"></div>
              <p class="hud-popup-status">Operational State: Active</p>
            </div>
          `, {
            className: 'modern-hud-popup',
            maxWidth: 180
          });
      });

      map.on('click', () => map.scrollWheelZoom.enable());
      if (isMounted) setMapReady(true);
    }).catch(() => {});

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapRef} 
        className="w-full h-full" 
        aria-label="Interactive map showing service coverage in Tamil Nadu" 
        role="application"
      />
      
      {/* Tactical Loading Overlay */}
      <AnimatePresence>
        {!mapReady && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[1000] bg-slate-950 flex flex-col items-center justify-center gap-4 px-6 text-center"
          >
            <div className="relative">
              <div className="w-12 h-12 border-2 border-brand-accent/30 rounded-full opacity-20" style={{ willChange: 'transform, opacity' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-brand-accent rounded-full shadow-[0_0_10px_#FACC15]" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-accent" style={{ willChange: 'opacity' }}>Initializing HUD</span>
              <span className="text-[9px] text-white/40 uppercase tracking-widest font-jakarta">Mapping District Boundaries...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiceZoneMap() {
  return (
    <section id="service-area" className="relative py-24 md:py-32 bg-brand-primary overflow-hidden border-t border-white/5">
      <div className="section-container relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="inline-block border border-brand-accent/30 text-brand-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-accent/5 shadow-sm font-inter">
            Our Presence
          </span>
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-brand-text mb-6">
            Our Service <span className="text-brand-accent">Coverage</span>
          </h2>
          <p className="text-brand-text/60 text-lg font-inter">
            Centrally located in Namakkal, providing engineering excellence across the primary nodes of Tamil Nadu.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="relative w-full aspect-[4/3] md:aspect-[16/7] overflow-hidden rounded-2xl shadow-2xl bg-slate-900 border border-white/5"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <LeafletMap />
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
          {SERVICE_ZONES.map((zone) => (
            <div key={zone.city} className="flex items-center gap-2.5 px-4 py-2 bg-slate-900/40 backdrop-blur-md rounded-full shadow-sm border border-white/10">
              <div 
                className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                style={{ background: zone.color }}
              />
              <span className="text-xs font-bold text-brand-text/70 font-inter uppercase tracking-wide">
                {zone.city} {zone.isPrimary ? '(Hub)' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}