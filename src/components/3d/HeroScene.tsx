'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';

// Realistic 2-Story Modern Villa
function RealisticModernVilla() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle orbit rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.08 - 1;
    }
  });

  return (
    <group ref={groupRef} scale={0.7}>
      {/* ── GROUND PLINTH */}
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[7, 0.2, 5.5]} />
        <meshStandardMaterial color="#8a8070" roughness={0.9} />
      </mesh>

      {/* ── GROUND FLOOR WOOODEN ACCENT / CLADDING */}
      <mesh position={[-1.5, 1.2, 1.8]} receiveShadow castShadow>
        <boxGeometry args={[3, 2, 0.4]} />
        <meshStandardMaterial color="#6b4423" roughness={0.7} />
      </mesh>

      {/* ── GROUND FLOOR MAIN BODY */}
      <mesh position={[1.5, 1.2, -0.5]} receiveShadow castShadow>
        <boxGeometry args={[3.5, 2, 4]} />
        <meshStandardMaterial color="#e8e4dc" roughness={0.8} />
      </mesh>
      
      {/* ── GROUND FLOOR BACK / LEFT EXTENSION */}
      <mesh position={[-1.5, 1.2, -1.5]} receiveShadow castShadow>
        <boxGeometry args={[2.5, 2, 2]} />
        <meshStandardMaterial color="#e8e4dc" roughness={0.8} />
      </mesh>

      {/* ── ENTRANCE DOOR (Wood) */}
      <mesh position={[-0.5, 1.1, 2.01]}>
        <boxGeometry args={[1.2, 1.8, 0.05]} />
        <meshStandardMaterial color="#3d2314" roughness={0.4} />
      </mesh>

      {/* ── GROUND FLOOR WINDOW */}
      <mesh position={[1.5, 1.2, 1.51]}>
        <boxGeometry args={[2, 1.2, 0.05]} />
        <meshStandardMaterial color="#1a252c" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* ── FIRST FLOOR MAIN BODY (White Stucco) */}
      <mesh position={[0.5, 3.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[5, 2, 4.5]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </mesh>

      {/* ── FIRST FLOOR BALCONY SLAB & OVERHANG */}
      <mesh position={[-1.5, 2.2, 1.5]} receiveShadow castShadow>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#555" roughness={0.8} />
      </mesh>

      {/* ── FIRST FLOOR FRONT LARGE WINDOW */}
      <mesh position={[0.5, 3.2, 2.26]}>
        <boxGeometry args={[3, 1.6, 0.1]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.1} metalness={0.6} />
      </mesh>
      {/* Window Glass Overlay */}
      <mesh position={[0.5, 3.2, 2.32]}>
        <boxGeometry args={[2.8, 1.4, 0.05]} />
        <meshStandardMaterial color="#7ab3d4" transparent opacity={0.6} roughness={0.05} metalness={0.9} />
      </mesh>

      {/* ── ROOF OVERHANG (Flat Concrete) */}
      <mesh position={[0.5, 4.3, 0.2]} receiveShadow castShadow>
        <boxGeometry args={[5.5, 0.2, 5]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>

      {/* ── BALCONY GLASS RAILING */}
      <mesh position={[-2.95, 2.7, 1.5]}>
        <boxGeometry args={[0.1, 1, 2]} />
        <meshStandardMaterial color="#7ab3d4" transparent opacity={0.4} roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[-1.5, 2.7, 2.45]}>
        <boxGeometry args={[3, 1, 0.1]} />
        <meshStandardMaterial color="#7ab3d4" transparent opacity={0.4} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* ── GARDEN/PLANTER BOX */}
      <mesh position={[2, 0.4, 2]} receiveShadow castShadow>
        <boxGeometry args={[2, 0.6, 1]} />
        <meshStandardMaterial color="#4a4036" roughness={1} />
      </mesh>
      {/* Shrubs inside planter */}
      {[-0.5, 0.5].map((offset, i) => (
        <mesh key={i} position={[2 + offset, 0.8, 2]} castShadow>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshStandardMaterial color="#2d4a22" roughness={0.9} />
        </mesh>
      ))}

      {/* ── ENTRANCE LIGHTING */}
      <pointLight position={[-0.5, 2.0, 2.5]} intensity={1.5} color="#f5a623" distance={5} />
      {/* ── BALCONY LIGHTING */}
      <pointLight position={[0.5, 3.5, 3]} intensity={0.8} color="#f5a623" distance={4} />
    </group>
  );
}

// Floating Particles (subtle)
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 60;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#f5a623" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

// Gently bobbing camera rig
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.y = 3 + Math.sin(t * (2 * Math.PI) / 4) * 0.05;
  });
  return null;
}

export default function HeroScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [5, 3, 8], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
        shadows
      >
        {/* Soft golden-hour lighting */}
        <ambientLight intensity={0.35} color="#fff0d0" />
        <directionalLight position={[6, 10, 6]} intensity={1.4} color="#fff5d8" castShadow
          shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-6, 4, -4]} intensity={0.3} color="#b8d0ff" />

        <CameraRig />
        <FloatingParticles />
        <RealisticModernVilla />

        <Grid position={[0, -1.22, 0]} args={[20, 20]} cellSize={0.6} cellThickness={0.4}
          cellColor="#f5a623" sectionSize={2.4} sectionThickness={0.8} sectionColor="#e8590c"
          fadeDistance={14} fadeStrength={1.2} infiniteGrid />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
