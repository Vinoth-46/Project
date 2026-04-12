'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

// ─── Constants ────────────────────────────────────────────────
const BASE_FOV   = 45;
const MIN_ZOOM   = 0.5;
const MAX_ZOOM   = 2.2;
const ZOOM_STEP  = 0.25;

// Zone definitions with colors
const ZONE_COLORS = {
  foundation: { base: '#8a8070', highlight: '#e8a020', glow: '#e8a020' },
  structure:  { base: '#d4c5a9', highlight: '#4a9eff', glow: '#4a9eff' },
  design:     { base: '#4a4540', highlight: '#e84040', glow: '#e84040' },
};

// ─── Camera zoom controller (lives inside Canvas) ─────────────
function CameraController({ zoom }: { zoom: number }) {
  const { camera, invalidate } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = BASE_FOV / zoom;   // narrow FOV = zoom in; no OrbitControls conflict
      camera.updateProjectionMatrix();
      invalidate();                    // wake up frameloop="demand"
    }
  }, [zoom, camera, invalidate]);
  return null;
}

// ─── Reusable box mesh ────────────────────────────────────────
function Box({
  position, size, color,
  emissive = '#000000', emissiveIntensity = 0,
  opacity = 1, roughness = 0.55, metalness = 0.08,
}: {
  position: [number, number, number]; size: [number, number, number]; color: string;
  emissive?: string; emissiveIntensity?: number; opacity?: number; roughness?: number; metalness?: number;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color} emissive={emissive} emissiveIntensity={emissiveIntensity}
        transparent={opacity < 1} opacity={opacity} roughness={roughness} metalness={metalness}
      />
    </mesh>
  );
}

// ─── Window ───────────────────────────────────────────────────
function Window({ position, rotation = [0, 0, 0] as [number, number, number] }: {
  position: [number, number, number]; rotation?: [number, number, number];
}) {
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

// ─── Door ─────────────────────────────────────────────────────
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

// ─── Building ─────────────────────────────────────────────────
interface BuildingProps { activeZone: string | null; onZoneClick: (zone: string | null) => void; }

function Building({ activeZone, onZoneClick }: BuildingProps) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => { return () => { document.body.style.cursor = 'auto'; }; }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.06;
    }
  });

  const getEmissive          = (z: string) => activeZone === z ? ZONE_COLORS[z as keyof typeof ZONE_COLORS].glow : '#000000';
  const getEmissiveIntensity = (z: string) => activeZone === z ? 0.25 : 0;
  const getOpacity           = (z: string) => activeZone && activeZone !== z ? 0.5 : 1;
  const getWallColor         = (z: string) => ZONE_COLORS[z as keyof typeof ZONE_COLORS].base;

  const wallColor            = getWallColor('structure');
  const wallEmissive         = getEmissive('structure');
  const wallEmissiveIntensity = getEmissiveIntensity('structure');
  const wallOpacity          = getOpacity('structure');

  const zoneProps = (zone: string) => ({
    onClick:      (e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onZoneClick(activeZone === zone ? null : zone); },
    onPointerOver: () => { document.body.style.cursor = 'pointer'; },
    onPointerOut:  () => { document.body.style.cursor = 'default'; },
  });

  // Floor geometry:
  //   floorY = 0 | 2.6 | 5.2
  //   slab top  = floorY + 0.15
  //   wallH     = 2.5
  //   wall top  = (floorY + 0.15) + 2.5
  //   fi=2 wall top = 5.35 + 2.5 = 7.85
  //
  // Roof slab: center at 7.96  (bottom = 7.96 - 0.11 = 7.85) ← flush ✓

  return (
    <group ref={groupRef} position={[0, -3.5, 0]}>

      {/* GROUND */}
      <Grid
        position={[0, -0.55, 0]} args={[30, 30]}
        cellSize={0.5} cellThickness={0.5} cellColor="#f5a623"
        sectionSize={2.5} sectionThickness={1} sectionColor="#e8590c"
        fadeDistance={25} fadeStrength={1} infiniteGrid
      />

      {/* FOUNDATION */}
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

      {/* STRUCTURE — 3 floors */}
      <group {...zoneProps('structure')}>
        {[0, 2.6, 5.2].map((floorY, fi) => {
          const slabTop = floorY + 0.15;
          const baseY   = slabTop;
          const wallH   = 2.5;
          const midY    = baseY + wallH / 2;
          return (
            <group key={fi}>
              {/* Floor slab */}
              <Box position={[0, floorY + 0.075, 0]} size={[5.4, 0.15, 3.4]} color="#c8baa0"
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} roughness={0.6} />
              {/* Front wall panels */}
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
              {([-2.47, 2.47] as number[]).map(cx => ([-1.47, 1.47] as number[]).map(cz => (
                <Box key={`${cx}-${cz}-${fi}`} position={[cx, midY, cz]} size={[0.28, wallH + 0.1, 0.28]}
                  color="#e8e0d0" emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity}
                  opacity={wallOpacity} roughness={0.5} metalness={0.1} />
              )))}
              {/* Windows */}
              {[-1.6, 0, 1.6].map((wx, wi) => (
                <Window key={wi} position={[wx, midY, 1.74]} />
              ))}
              {/* Balcony slab — bottom flush with floor slab top */}
              <Box position={[0, slabTop + 0.06, 2.0]} size={[4.6, 0.12, 0.7]} color="#c8baa0"
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} roughness={0.6} />
              {/* Railing */}
              <Box position={[0, slabTop + 0.62, 2.32]} size={[4.6, 0.04, 0.04]} color="#2a2a2a"
                emissive={wallEmissive} emissiveIntensity={wallEmissiveIntensity} opacity={wallOpacity} metalness={0.5} roughness={0.3} />
            </group>
          );
        })}
      </group>

      {/* DESIGN ZONE — shifted -0.14 so roof bottom = 7.85 = wall top of fi=2 */}
      <group {...zoneProps('design')}>
        {/* Roof slab: center 7.96, height 0.22 → bottom = 7.96 - 0.11 = 7.85 ✓ */}
        <Box position={[0, 7.96, 0]} size={[5.5, 0.22, 3.5]}
          color={activeZone === 'design' ? '#6a6560' : '#4a4540'}
          emissive={getEmissive('design')} emissiveIntensity={getEmissiveIntensity('design')}
          opacity={getOpacity('design')} roughness={0.6} />
        {/* Parapet walls */}
        {[
          { pos: [0, 8.56, 1.65]  as [number,number,number], size: [5.5, 1.0, 0.18] as [number,number,number] },
          { pos: [0, 8.56, -1.65] as [number,number,number], size: [5.5, 1.0, 0.18] as [number,number,number] },
          { pos: [-2.66, 8.56, 0] as [number,number,number], size: [0.18, 1.0, 3.12] as [number,number,number] },
          { pos: [2.66,  8.56, 0] as [number,number,number], size: [0.18, 1.0, 3.12] as [number,number,number] },
        ].map((p, i) => (
          <Box key={i} position={p.pos} size={p.size}
            color={activeZone === 'design' ? '#6a6060' : '#4a4540'}
            emissive={getEmissive('design')} emissiveIntensity={getEmissiveIntensity('design')}
            opacity={getOpacity('design')} roughness={0.65} />
        ))}
        {/* Water tank */}
        <Box position={[1.5, 9.41, -0.5]} size={[0.9, 0.9, 0.9]} color="#ddd8d0"
          emissive={getEmissive('design')} emissiveIntensity={getEmissiveIntensity('design')}
          opacity={getOpacity('design')} roughness={0.4} metalness={0.15} />
        {/* Mumty */}
        <Box position={[-1.2, 9.21, 0]} size={[1.4, 0.7, 1.4]} color={getWallColor('structure')}
          emissive={getEmissive('design')} emissiveIntensity={getEmissiveIntensity('design')}
          opacity={getOpacity('design')} roughness={0.7} />
      </group>

      {/* DOOR */}
      <Door position={[0, 1.15, 1.75]} />

      {/* ENTRANCE STEPS */}
      {[0, 1, 2].map((step) => (
        <Box key={step} position={[0, step * 0.18 - 0.35, 1.9 + step * 0.2]}
          size={[1.4 - step * 0.1, 0.18, 0.4]} color="#9a9488" roughness={0.85} />
      ))}

      {/* CANOPY */}
      <Box position={[0, 2.45, 2.05]} size={[1.6, 0.1, 0.7]} color="#2c3e50" roughness={0.5} metalness={0.2} />

      {/* ENTRANCE LIGHT */}
      <pointLight position={[0, 1.5, 2.2]} intensity={0.8} color="#f5a623" distance={4} />
    </group>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────
const ZONE_INFO = {
  foundation: {
    title: 'Foundation & Base', accent: '#e8a020',
    description: 'Engineered for soil stability and load distribution.',
    details: ['Reinforced concrete footings', 'Soil bearing analysis', 'DTCP compliant depth'],
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
      backdropFilter: 'blur(16px)', zIndex: 20, border: `1px solid ${info.accent}55`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{ fontSize: 11, letterSpacing: '.1em', color: info.accent, textTransform: 'uppercase', fontWeight: 600 }}>
          {zone}
        </span>
        <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
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

// ─── Zone hint buttons ────────────────────────────────────────
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

// ─── Zoom controls UI ─────────────────────────────────────────
function ZoomControls({
  onZoomIn, onZoomOut, canZoomIn, canZoomOut,
}: {
  onZoomIn: () => void; onZoomOut: () => void; canZoomIn: boolean; canZoomOut: boolean;
}) {
  const btnBase: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 32, height: 32, border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(8px)',
    color: '#ccc', cursor: 'pointer', transition: 'all .18s',
  };
  return (
    <div style={{
      position: 'absolute', bottom: '3.2rem', right: '1rem',
      display: 'flex', flexDirection: 'column', gap: 2, zIndex: 20,
    }}>
      {/* Zoom In */}
      <button
        onClick={onZoomIn}
        disabled={!canZoomIn}
        aria-label="Zoom in"
        style={{
          ...btnBase,
          borderRadius: '6px 6px 2px 2px',
          opacity: canZoomIn ? 1 : 0.35,
          color: canZoomIn ? '#facc15' : '#666',
        }}
        onMouseEnter={e => { if (canZoomIn) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(250,204,21,0.15)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(10,10,10,0.75)'; }}
      >
        <Plus size={15} strokeWidth={2.5} />
      </button>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />

      {/* Zoom Out */}
      <button
        onClick={onZoomOut}
        disabled={!canZoomOut}
        aria-label="Zoom out"
        style={{
          ...btnBase,
          borderRadius: '2px 2px 6px 6px',
          opacity: canZoomOut ? 1 : 0.35,
          color: canZoomOut ? '#facc15' : '#666',
        }}
        onMouseEnter={e => { if (canZoomOut) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(250,204,21,0.15)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(10,10,10,0.75)'; }}
      >
        <Minus size={15} strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────
export default function BuildingModel() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [zoomLevel,  setZoomLevel]  = useState(1);
  const [containerRef, isInView]    = useInView({ threshold: 0.1 });

  const handleZoomIn  = () => setZoomLevel(z => Math.min(+(z + ZOOM_STEP).toFixed(2), MAX_ZOOM));
  const handleZoomOut = () => setZoomLevel(z => Math.max(+(z - ZOOM_STEP).toFixed(2), MIN_ZOOM));

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}>
      {isInView ? (
        <Canvas
          shadows
          camera={{ position: [8, 3, 10], fov: BASE_FOV }}
          dpr={[1, 2]}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
          style={{ background: 'transparent' }}
          frameloop="demand"
        >
          <CameraController zoom={zoomLevel} />

          <ambientLight intensity={0.55} color="#fff8e8" />
          <directionalLight
            position={[10, 18, 8]} intensity={1.8} color="#fff5d0" castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.5} shadow-camera-far={60}
            shadow-camera-left={-12} shadow-camera-right={12}
            shadow-camera-top={12} shadow-camera-bottom={-12}
          />
          <directionalLight position={[-8, 6, -6]} intensity={0.4} color="#c0d8ff" />

          <Building activeZone={activeZone} onZoneClick={setActiveZone} />

          <OrbitControls
            enablePan={false} enableZoom={false}
            minPolarAngle={0.3} maxPolarAngle={Math.PI / 2.1}
            autoRotate={!activeZone} autoRotateSpeed={0.5}
            target={[0, 0.5, 0]}
          />
        </Canvas>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-brand-primary/40 font-bold uppercase tracking-tighter text-xs">
            Interactive Engineering Module
          </p>
        </div>
      )}

      <AnimatePresence>
        {activeZone && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <TooltipPanel zone={activeZone} onClose={() => setActiveZone(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <ZoneHints activeZone={activeZone} onSelect={setActiveZone} />

      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        canZoomIn={zoomLevel < MAX_ZOOM}
        canZoomOut={zoomLevel > MIN_ZOOM}
      />

      {!activeZone && (
        <div style={{
          position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)',
          fontSize: 11, color: 'rgba(15,23,42,0.4)', letterSpacing: '.08em',
          pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 10,
          fontWeight: 600, fontFamily: 'Inter, sans-serif',
        }}>
          Click a zone or use buttons below — drag to rotate
        </div>
      )}
    </div>
  );
}