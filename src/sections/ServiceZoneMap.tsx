'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Service Coverage Data with specific colors for the "Outlines"
const SERVICE_ZONES = [
  { city: 'Namakkal', lat: 11.2189, lng: 78.1674, color: '#FACC15', radius: 25000, label: 'Primary Centre', isPrimary: true },
  { city: 'Salem', lat: 11.6643, lng: 78.1460, color: '#3B82F6', radius: 18000, label: 'Secondary Node' },
  { city: 'Karur', lat: 10.9601, lng: 78.0766, color: '#22C55E', radius: 15000, label: 'Secondary Node' },
  { city: 'Trichy', lat: 10.7905, lng: 78.7047, color: '#F97316', radius: 18000, label: 'Secondary Node' },
];

// Connection Lines from Primary Hub (Namakkal) to Nodes
const CONNECTIONS = [
  { fromId: 0, toId: 1 }, // Namakkal to Salem
  { fromId: 0, toId: 2 }, // Namakkal to Karur
  { fromId: 0, toId: 3 }, // Namakkal to Trichy
];

function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

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
      }).addTo(map);

      // Force a tactical blue/slate tint via CSS filter on the tile layer's container
      if (tiles.getContainer()) {
        tiles.getContainer()!.style.filter = 'hue-rotate(15deg) brightness(1.6) contrast(1.2) saturate(0.9)';
      }

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
            <div class="map-marker-container" style="--marker-color: ${zone.color}">
              <div class="map-marker-pulse"></div>
              <div class="map-marker-pulse" style="animation-delay: 0.8s"></div>
              <div class="map-marker-pulse" style="animation-delay: 1.6s"></div>
              <div class="map-marker-core"></div>
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        L.marker([zone.lat, zone.lng], { icon })
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
    }).catch(console.error);

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div ref={mapRef} className="w-full h-full" />
    </>
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
