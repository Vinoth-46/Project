'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Zone definitions with colors
const ZONE_COLORS = {
  foundation: { base: '#8a8070', highlight: '#e8a020', glow: '#e8a020' },
  structure: { base: '#d4c5a9', highlight: '#4a9eff', glow: '#4a9eff' },
  design: { base: '#4a4540', highlight: '#e84040', glow: '#e84040' },
};

// Reusable box mesh with optional emissive
function Box({
  position, size, color, emissive = '#000000', emissiveIntensity = 0, opacity = 1, roughness = 0.7, metalness = 0.05,
}: {
  position: [number, number, number]; size: [number, number, number]; color: string;
  emissive?: string; emissiveIntensity?: number; opacity?: number; roughness?: number; metalness?: number;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={emissiveIntensity}
        transparent={opacity < 1} opacity={opacity} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

// Window with glass
function Window({ position, rotation = [0, 0, 0] as [number, number, number] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.7, 0.06]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.42, 0.57, 0.03]} />
        <meshStandardMaterial color="#7ab3d4" transparent opacity={0.6} roughness={0.05} metalness={0.5} />
      </mesh>
    </group>
  );
}

// Door
function Door({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.8, 2.0, 0.1]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.65, 1.85, 0.04]} />
        <meshStandardMaterial color="#6b3a2a" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0.25, 0, 0.12]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#c8a020" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

interface BuildingProps { activeZone: string | null; onZoneClick: (zone: string | null) => void; }

function Building({ activeZone, onZoneClick }: BuildingProps) {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    return () => { document.body.style.cursor = 'auto'; };
  }, []);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.06;
    }
  });

  const getEmissive = (zone: string) => activeZone === zone ? ZONE_COLORS[zone as keyof typeof ZONE_COLORS].glow : '#000000';
  const getEmissiveIntensity = (zone: string) => activeZone === zone ? 0.25 : 0;
  const getOpacity = (zone: string) => activeZone && activeZone !== zone ? 0.5 : 1;
  const getWallColor = (zone: string) => ZONE_COLORS[zone as keyof typeof ZONE_COLORS].base;

  const wallColor = getWallColor('structure');
  const wallEmissive = getEmissive('structure');
  const wallEmissiveIntensity = getEmissiveIntensity('structure');
  const wallOpacity = getOpacity('structure');

  const zoneProps = (zone: string) => ({
    onClick: (e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onZoneClick(activeZone === zone ? null : zone); },
    onPointerOver: () => { document.body.style.cursor = 'pointer'; },
    onPointerOut: () => { document.body.style.cursor = 'default'; },
  });

  return (
    <group ref={groupRef} position={[0, -3.5, 0]}>

      {/* ── GROUND — Replace solid plane with grid / wireframe mess-like structure */}
      <Grid 
        position={[0, -0.55, 0]} 
        args={[30, 30]} 
        cellSize={0.5} 
        cellThickness={0.5} 
        cellColor="#f5a623" 
        sectionSize={2.5} 
        sectionThickness={1} 
        sectionColor="#e8590c" 
        fadeDistance={25} 
        fadeStrength={1} 
        infiniteGrid 
      />

      {/* ── FOUNDATION ZONE */}
      <group {...zoneProps('foundation')}>
        <Box position={[0, -0.25, 0]} size={[6.2, 0.5, 4.2]}
          color={activeZone === 'foundation' ? '#b09060' : '#8a8070'}
          emissive={getEmissive('foundation')} emissiveIntensity={getEmissiveIntensity('foundation')}
          opacity={getOpacity('foundation')} roughness={0.9} />
        <Box position={[0, 0.1, 0]} size={[5.6, 0.2, 3.6]}
          color={activeZone === 'foundation' ? '#a08060' : '#7a6e60'}
          emissive={getEmissive('foundation')} emissiveIntensity={getEmissiveIntensity('foundation')}
          opacity={getOpacity('foundation')} roughness={0.85} />
      </group>

      {/* ── STRUCTURE ZONE (3 floors) */}
      <group {...zoneProps('structure')}>
        {[0, 2.6, 5.2].map((floorY, fi) => {
          const baseY = floorY + 0.2;
          const midY = baseY + 1.25;
          const wallH = 2.5;
          return (
            <group key={fi}>
              {/* Floor slab */}
              <Box position={[0, floorY + 0.075, 0]} size={[5.4, 0.15, 3.4]} color="#c8baa0"
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} />
              {/* Front wall panels (split for windows) */}
              <Box position={[-2.1, midY, 1.65]} size={[0.9, wallH, 0.18]} color={wallColor}
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} />
              <Box position={[-0.8, midY, 1.65]} size={[0.35, wallH, 0.18]} color={wallColor}
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} />
              <Box position={[0.8, midY, 1.65]} size={[0.35, wallH, 0.18]} color={wallColor}
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} />
              <Box position={[2.1, midY, 1.65]} size={[0.9, wallH, 0.18]} color={wallColor}
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} />
              {/* Lintels */}
              <Box position={[0, baseY + wallH - 0.3, 1.65]} size={[5.2, 0.35, 0.18]} color={wallColor}
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} />
              <Box position={[0, baseY + 0.3, 1.65]} size={[5.2, 0.4, 0.18]} color={wallColor}
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} />
              {/* Back + side walls */}
              <Box position={[0, midY, -1.65]} size={[5.2, wallH, 0.18]} color={wallColor}
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} />
              <Box position={[-2.6, midY, 0]} size={[0.18, wallH, 3.12]} color={wallColor}
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} />
              <Box position={[2.6, midY, 0]} size={[0.18, wallH, 3.12]} color={wallColor}
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} />
              {/* Columns */}
              {[-2.47, 2.47].map(cx => [-1.47, 1.47].map(cz => (
                <Box key={`${cx}-${cz}-${fi}`} position={[cx, midY, cz]} size={[0.28, wallH + 0.1, 0.28]}
                  color="#e8e0d0" emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} roughness={0.6} />
              )))}
              {/* Windows front */}
              {[-1.6, 0, 1.6].map((wx, wi) => (
                <Window key={wi} position={[wx, midY, 1.74]} />
              ))}
              {/* Balcony */}
              <Box position={[0, floorY + 0.15 + 0.3, 2.0]} size={[4.6, 0.12, 0.7]} color="#c8baa0"
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} />
              {/* Railing */}
              <Box position={[0, floorY + 0.15 + 0.62, 2.32]} size={[4.6, 0.04, 0.04]} color="#2a2a2a"
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} metalness={0.4} />
            </group>
          );
        })}
      </group>

      {/* ── DESIGN ZONE (roof, parapet) */}
      <group {...zoneProps('design')}>
        {/* Roof slab */}
        <Box position={[0, 8.1, 0]} size={[5.5, 0.22, 3.5]}
          color={activeZone === 'design' ? '#6a6560' : '#4a4540'}
          emissive={getEmissive('design')} emissiveIntensity={getEmissiveIntensity('design')}
          opacity={getOpacity('design')} roughness={0.6} />
        {/* Parapet walls */}
        {[
          { pos: [0, 8.7, 1.65] as [number, number, number], size: [5.5, 1.0, 0.18] as [number, number, number] },
          { pos: [0, 8.7, -1.65] as [number, number, number], size: [5.5, 1.0, 0.18] as [number, number, number] },
          { pos: [-2.66, 8.7, 0] as [number, number, number], size: [0.18, 1.0, 3.12] as [number, number, number] },
          { pos: [2.66, 8.7, 0] as [number, number, number], size: [0.18, 1.0, 3.12] as [number, number, number] },
        ].map((p, i) => (
          <Box key={i} position={p.pos} size={p.size}
            color={activeZone === 'design' ? '#6a6060' : '#4a4540'}
            emissive={getEmissive('design')} emissiveIntensity={getEmissiveIntensity('design')}
            opacity={getOpacity('design')} roughness={0.65} />
        ))}
        {/* Water tank */}
        <Box position={[1.5, 9.55, -0.5]} size={[0.9, 0.9, 0.9]} color="#ddd8d0"
          emissive={getEmissive('design')} emissiveIntensity={getEmissiveIntensity('design')}
          opacity={getOpacity('design')} roughness={0.4} />
        {/* Mumty */}
        <Box position={[-1.2, 9.35, 0]} size={[1.4, 0.7, 1.4]} color={getWallColor('structure')}
          emissive={getEmissive('design')} emissiveIntensity={getEmissiveIntensity('design')}
          opacity={getOpacity('design')} roughness={0.7} />
      </group>

      {/* ── DOOR (always visible, not zoned) */}
      <Door position={[0, 1.1, 1.75]} />

      {/* ── ENTRANCE STEPS */}
      {[0, 1, 2].map((step) => (
        <Box key={step} position={[0, step * 0.18 - 0.35, 1.9 + step * 0.2]}
          size={[1.4 - step * 0.1, 0.18, 0.4]} color="#9a9488" roughness={0.85} />
      ))}

      {/* ── CANOPY */}
      <Box position={[0, 2.45, 2.05]} size={[1.6, 0.1, 0.7]} color="#2c3e50" roughness={0.5} />

      {/* ── ENTRANCE POINT LIGHT */}
      <pointLight position={[0, 1.5, 2.2]} intensity={0.8} color="#f5a623" distance={4} />
    </group>
  );
}

// Tooltip Panel
const ZONE_INFO = {
  foundation: {
    title: 'Foundation & Base', accent: '#e8a020',
    description: 'Engineered for soil stability and load distribution.',
    details: ['Reinforced concrete footings', 'Soil bearing analysis', 'DTCP compliant depth', 'Anti-seismic design'],
  },
  structure: {
    title: 'RCC Structure', accent: '#4a9eff',
    description: 'Precision-built frames using M25 grade concrete.',
    details: ['M25/M30 grade concrete', 'Fe-500 TMT steel bars', 'Load-bearing columns', 'Earthquake resistant'],
  },
  design: {
    title: 'Architecture & Finish', accent: '#e84040',
    description: 'Crafted aesthetics aligned with CMDA/DTCP norms.',
    details: ['CMDA approved plans', 'Premium plastering', 'Waterproof roofing', 'Modern elevation'],
  },
};

function TooltipPanel({ zone, onClose }: { zone: string | null; onClose: () => void }) {
  if (!zone) return null;
  const info = ZONE_INFO[zone as keyof typeof ZONE_INFO];
  return (
    <div style={{
      position: 'absolute', top: '50%', right: '1.5rem', transform: 'translateY(-50%)',
      width: 220, background: 'rgba(10,10,10,0.92)', borderRadius: 12, padding: '1.1rem',
      backdropFilter: 'blur(16px)', zIndex: 20,
      border: `1px solid ${info.accent}55`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{ fontSize: 11, letterSpacing: '.1em', color: info.accent, textTransform: 'uppercase', fontWeight: 600 }}>
          {zone}
        </span>
        <button onClick={onClose} aria-label="Close tooltip" style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, color: '#f0ede8', margin: '0 0 6px' }}>{info.title}</p>
      <p style={{ fontSize: 12, color: '#998f82', lineHeight: 1.5, margin: '0 0 10px' }}>{info.description}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {info.details.map((d, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#c0b8aa' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: info.accent, flexShrink: 0 }} />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ZoneHints({ activeZone, onSelect }: { activeZone: string | null; onSelect: (z: string | null) => void }) {
  const zones = ['foundation', 'structure', 'design'] as const;
  return (
    <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 20 }}>
      {zones.map((z) => {
        const accent = ZONE_COLORS[z].highlight;
        return (
          <button key={z} onClick={() => onSelect(activeZone === z ? null : z)} style={{
            padding: '5px 14px', fontSize: 11, letterSpacing: '.06em', textTransform: 'capitalize',
            background: activeZone === z ? `${accent}22` : 'rgba(10,10,10,0.7)',
            border: `1px solid ${activeZone === z ? accent : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 6, color: activeZone === z ? accent : '#888', cursor: 'pointer',
            backdropFilter: 'blur(8px)', transition: 'all .2s',
          }}>
            {z}
          </button>
        );
      })}
    </div>
  );
}

export default function BuildingModel() {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas shadows camera={{ position: [8, 3, 10], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        style={{ background: 'transparent' }}>
        {/* Warm golden sunlight */}
        <ambientLight intensity={0.55} color="#fff8e8" />
        <directionalLight position={[10, 18, 8]} intensity={1.8} color="#fff5d0" castShadow
          shadow-mapSize={[2048, 2048]} shadow-camera-near={0.5} shadow-camera-far={60}
          shadow-camera-left={-12} shadow-camera-right={12} shadow-camera-top={12} shadow-camera-bottom={-12} />
        {/* Cool fill from left */}
        <directionalLight position={[-8, 6, -6]} intensity={0.4} color="#c0d8ff" />

        <Building activeZone={activeZone} onZoneClick={setActiveZone} />

        <OrbitControls enablePan={false} minDistance={7} maxDistance={18}
          minPolarAngle={0.3} maxPolarAngle={Math.PI / 2.1}
          autoRotate={!activeZone} autoRotateSpeed={0.5} target={[0, 0.5, 0]} />
      </Canvas>

      <AnimatePresence>
        {activeZone && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <TooltipPanel zone={activeZone} onClose={() => setActiveZone(null)} />
          </motion.div>
        )}
      </AnimatePresence>
      <ZoneHints activeZone={activeZone} onSelect={setActiveZone} />

      {!activeZone && (
        <div style={{
          position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)',
          fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '.08em',
          pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          Click a zone or use buttons below — drag to rotate
        </div>
      )}
    </div>
  );
}
