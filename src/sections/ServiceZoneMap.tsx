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

      // Clean "Normal" Map Tiles (Voyager style)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

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
          className: 'custom-marker',
          html: `
            <div style="
              width: 14px; 
              height: 14px; 
              background: ${zone.color}; 
              border: 2px solid #fff; 
              border-radius: 50%;
              box-shadow: 0 0 10px rgba(0,0,0,0.2);
            "></div>
          `,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        L.marker([zone.lat, zone.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: 'Space Grotesk', sans-serif; text-align: center;">
              <b style="color: ${zone.color}; font-size: 14px;">${zone.city}</b><br/>
              <span style="color: #64748b; font-size: 11px; text-transform: uppercase;">${zone.label}</span>
            </div>
          `);
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

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}

export default function ServiceZoneMap() {
  return (
    <section id="service-area" className="relative py-24 md:py-32 bg-brand-softWhite overflow-hidden border-t border-slate-200">
      <div className="section-container relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="inline-block border border-brand-accent/30 text-brand-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-accent/5 shadow-sm font-inter">
            Our Presence
          </span>
          <h2 className="text-3xl md:text-5xl font-sgrotesk font-bold text-brand-primary mb-6">
            Our Service <span className="text-brand-accent">Coverage</span>
          </h2>
          <p className="text-slate-600 text-lg font-inter">
            Centrally located in Namakkal, providing engineering excellence across the primary nodes of Tamil Nadu.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="relative w-full aspect-[4/3] md:aspect-[16/7] overflow-hidden rounded-2xl shadow-xl bg-white border border-slate-200"
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
            <div key={zone.city} className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
              <div 
                className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                style={{ background: zone.color }}
              />
              <span className="text-xs font-bold text-slate-700 font-inter uppercase tracking-wide">
                {zone.city} {zone.isPrimary ? '(Hub)' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
