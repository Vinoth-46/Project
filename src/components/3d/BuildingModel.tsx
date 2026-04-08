'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface ZoneProps {
  position: [number, number, number];
  size: [number, number, number];
  name: string;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
  color: string;
}

function BuildingZone({
  position,
  size,
  name: _name,
  isActive,
  isHovered,
  onClick,
  onHover,
  color,
}: ZoneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={() => onHover(false)}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={isHovered || isActive ? color : '#2a2a2a'}
        metalness={0.6}
        roughness={0.3}
        emissive={isHovered || isActive ? color : '#000000'}
        emissiveIntensity={isHovered || isActive ? 0.3 : 0}
        transparent
        opacity={0.9}
      />
      {/* Wireframe overlay */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial
          color={isHovered || isActive ? '#f5a623' : '#444444'}
          linewidth={2}
        />
      </lineSegments>
    </mesh>
  );
}

// Foundation Platform
function FoundationPlatform() {
  return (
    <mesh position={[0, -1.6, 0]}>
      <boxGeometry args={[4, 0.2, 4]} />
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.4}
        roughness={0.8}
      />
      {/* Grid pattern on foundation */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4, 0.2, 4)]} />
        <lineBasicMaterial color="#f5a623" transparent opacity={0.3} />
      </lineSegments>
    </mesh>
  );
}

// Scene Component
function Scene({
  activeZone,
  setActiveZone,
  hoveredZone,
  setHoveredZone,
}: {
  activeZone: string | null;
  setActiveZone: (zone: string | null) => void;
  hoveredZone: string | null;
  setHoveredZone: (zone: string | null) => void;
}) {
  const zones = [
    {
      name: 'foundation',
      position: [0, -1, 0] as [number, number, number],
      size: [2.5, 1, 2.5] as [number, number, number],
      color: '#e8590c',
    },
    {
      name: 'structure',
      position: [0, 0.5, 0] as [number, number, number],
      size: [2.2, 2, 2.2] as [number, number, number],
      color: '#f5a623',
    },
    {
      name: 'design',
      position: [0, 2.2, 0] as [number, number, number],
      size: [1.8, 1.2, 1.8] as [number, number, number],
      color: '#f7b84e',
    },
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1} color="#f5a623" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#e8590c" />
      <pointLight position={[5, -2, 5]} intensity={0.3} color="#f5a623" />

      <FoundationPlatform />

      {zones.map((zone) => (
        <BuildingZone
          key={zone.name}
          {...zone}
          isActive={activeZone === zone.name}
          isHovered={hoveredZone === zone.name}
          onClick={() => setActiveZone(activeZone === zone.name ? null : zone.name)}
          onHover={(hovered) => setHoveredZone(hovered ? zone.name : null)}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 8,
          ]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#f5a623" transparent opacity={0.5} />
        </mesh>
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
      />
    </>
  );
}

const zoneInfo: Record<string, { title: string; description: string }> = {
  foundation: {
    title: 'Foundation',
    description:
      'Engineered for seismic resistance and soil stability. Our foundations are designed using advanced geotechnical analysis to ensure maximum safety and longevity.',
  },
  structure: {
    title: 'Structure',
    description:
      'Precision-built RCC frames and load-bearing walls. We use high-grade materials and follow strict quality control measures for structural integrity.',
  },
  design: {
    title: 'Design',
    description:
      'Architectural drawings aligned with CMDA/DTCP norms. Our designs blend aesthetics with functionality while ensuring regulatory compliance.',
  },
};

export default function BuildingModel() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [5, 3, 6], fov: 50 }} dpr={[1, 2]}>
        <Scene
          activeZone={activeZone}
          setActiveZone={setActiveZone}
          hoveredZone={hoveredZone}
          setHoveredZone={setHoveredZone}
        />
      </Canvas>

      {/* Zone Labels */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {['foundation', 'structure', 'design'].map((zone) => (
          <button
            key={zone}
            onClick={() => setActiveZone(activeZone === zone ? null : zone)}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-all ${
              activeZone === zone
                ? 'bg-gold text-dark border-gold'
                : 'bg-dark/80 text-warm-gray border-gold/30 hover:border-gold/60'
            }`}
          >
            {zone.charAt(0).toUpperCase() + zone.slice(1)}
          </button>
        ))}
      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {activeZone && (
          <motion.div
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 glass-card p-4 md:p-6"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-lg font-outfit font-bold text-gold">
                {zoneInfo[activeZone].title}
              </h4>
              <button
                onClick={() => setActiveZone(null)}
                className="text-warm-gray hover:text-warm-white transition-colors"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-warm-gray leading-relaxed">
              {zoneInfo[activeZone].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!activeZone && (
        <motion.div
          className="absolute bottom-4 left-4 text-xs text-warm-gray/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Click on building zones to explore
        </motion.div>
      )}
    </div>
  );
}
