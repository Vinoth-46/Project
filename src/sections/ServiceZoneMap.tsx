'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Dynamically import Leaflet to avoid SSR issues
const SERVICE_ZONES = {
  primary: [
    { city: 'Namakkal', lat: 11.2189, lng: 78.1674, label: 'Primary Service Zone', isPrimary: true },
  ],
  secondary: [
    { city: 'Salem', lat: 11.6643, lng: 78.1460, label: 'Service Zone' },
    { city: 'Karur', lat: 10.9601, lng: 78.0766, label: 'Service Zone' },
    { city: 'Trichy', lat: 10.7905, lng: 78.7047, label: 'Service Zone' },
    { city: 'Erode', lat: 11.3410, lng: 77.7172, label: 'Service Zone' },
    { city: 'Coimbatore', lat: 11.0168, lng: 76.9558, label: 'Service Zone' },
  ],
};

function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    let isMounted = true;
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return;

    // Inject Leaflet CSS once
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Dynamically import leaflet
    import('leaflet').then((L) => {
      if (!isMounted || !mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [11.2189, 78.1674],
        zoom: 8,
        scrollWheelZoom: false,
        zoomControl: true,
      });
      mapInstanceRef.current = map;

      // Map style matching the Contact section (Grayscale/High Contrast)
      L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        className: 'grayscale-tiles'
      }).addTo(map);

      // Primary zone — Namakkal
      const primaryZone = SERVICE_ZONES.primary[0];
      
      // Central Glow Ring
      L.circle([primaryZone.lat, primaryZone.lng], {
        radius: 18000,
        color: '#f5a623',
        fillColor: '#f5a623',
        fillOpacity: 0.25,
        weight: 2,
        className: 'pulse-circle'
      }).addTo(map);

      const primaryIcon = L.divIcon({
        className: '',
        html: `<div style="
          width:24px;height:24px;border-radius:50%;
          background:linear-gradient(135deg, #f5a623, #e8590c);
          border:3px solid #fff;
          box-shadow:0 0 0 4px rgba(245,166,35,0.4),0 0 24px rgba(245,166,35,0.8);
          animation:pulse-marker 1.5s ease-in-out infinite;
        "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      L.marker([primaryZone.lat, primaryZone.lng], { icon: primaryIcon })
        .addTo(map)
        .bindPopup(`<div style="text-align:center"><b style="color:#f5a623;font-size:16px;">${primaryZone.city}</b><br/><span style="color:#c0b8aa">${primaryZone.label}</span></div>`);

      // Secondary zones & Connections
      SERVICE_ZONES.secondary.forEach(zone => {
        // Connection Line (Hub and Spoke)
        L.polyline([
          [primaryZone.lat, primaryZone.lng],
          [zone.lat, zone.lng]
        ], {
          color: '#e8590c',
          weight: 2,
          opacity: 0.65,
          dashArray: '8, 8',
          className: 'connection-line'
        }).addTo(map);

        // Zone Area
        L.circle([zone.lat, zone.lng], {
          radius: 12000,
          color: '#f5a623',
          fillColor: '#f5a623',
          fillOpacity: 0.1,
          weight: 1.5,
          dashArray: '4,4',
        }).addTo(map);

        const secondaryIcon = L.divIcon({
          className: '',
          html: `<div style="
            width:16px;height:16px;border-radius:50%;
            background:rgba(10,10,10,0.8);
            border:2px solid #f5a623;
            box-shadow:0 0 10px rgba(245,166,35,0.5);
            transition: all 0.3s;
          "></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        L.marker([zone.lat, zone.lng], { icon: secondaryIcon })
          .addTo(map)
          .bindPopup(`<b style="color:#f5a623">${zone.city}</b><br/><span style="color:#aa9f8f">${zone.label}</span>`);
      });

      // Enable scroll zoom only after click
      map.on('click', () => { map.scrollWheelZoom.enable(); });
      map.on('mouseout', () => { map.scrollWheelZoom.disable(); });
    }).catch(console.error);

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}

export default function ServiceZoneMap() {
  return (
    <section id="service-area" className="relative py-20 md:py-32 bg-dark overflow-hidden">
      <style>{`
        @keyframes pulse-marker {
          0%, 100% { box-shadow: 0 0 0 4px rgba(245,166,35,0.3), 0 0 20px rgba(245,166,35,0.6); transform: scale(1); }
          50% { box-shadow: 0 0 0 8px rgba(245,166,35,0.1), 0 0 35px rgba(245,166,35,0.9); transform: scale(1.15); }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -16; }
        }
        @keyframes pulse-circle {
          0%, 100% { fill-opacity: 0.25; }
          50% { fill-opacity: 0.4; }
        }
        .connection-line {
          animation: dash-flow 1s linear infinite;
        }
        .pulse-circle {
          animation: pulse-circle 3s ease-in-out infinite;
        }
        .grayscale-tiles {
          filter: grayscale(80%) contrast(1.2);
        }
        .leaflet-container { background: #0a0a0a; }
        .leaflet-popup-content-wrapper { background: rgba(15,15,15,0.98); color: #f0ede8; border: 1px solid rgba(245,166,35,0.4); border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
        .leaflet-popup-tip { background: rgba(15,15,15,0.98) !important; border-top: 1px solid rgba(245,166,35,0.4); border-left: 1px solid rgba(245,166,35,0.4); }
      `}</style>

      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}>
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Where We Operate
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-warm-white mb-4">
            Our Service <span className="gradient-text">Coverage</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg">
            Serving Namakkal and surrounding districts across Tamil Nadu.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          className="relative w-full overflow-hidden"
          style={{ height: 480, borderRadius: 12, border: '1px solid rgba(245,166,35,0.3)' }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LeafletMap />
        </motion.div>

        {/* Legend */}
        <motion.div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-warm-gray"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}>
          <div className="flex items-center gap-2">
            <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#f5a623', border: '2px solid #fff', display: 'inline-block', boxShadow: '0 0 8px rgba(245,166,35,0.7)' }} />
            Primary Zone (Namakkal)
          </div>
          <div className="flex items-center gap-2">
            <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'transparent', border: '2px solid #f5a623', display: 'inline-block' }} />
            Secondary Service Zones
          </div>
        </motion.div>
      </div>
    </section>
  );
}
