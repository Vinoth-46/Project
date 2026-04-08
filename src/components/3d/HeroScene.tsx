'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';

// Building Wireframe Component
function BuildingWireframe() {
  const meshRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const solidRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  // Create building geometry with multiple boxes
  const buildingGeometry = useMemo(() => {
    return new THREE.BoxGeometry(1.5, 2.5, 1.5);
  }, []);

  return (
    <group ref={meshRef} position={[0, 0.5, 0]}>
      {/* Wireframe Building */}
      <mesh ref={wireframeRef} geometry={buildingGeometry}>
        <meshBasicMaterial
          color="#f5a623"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Solid Building (fades in on scroll) */}
      <mesh ref={solidRef} geometry={buildingGeometry} scale={[0.95, 0.95, 0.95]}>
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Floor lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, -1 + i * 0.4, 0]}>
          <boxGeometry args={[1.52, 0.02, 1.52]} />
          <meshBasicMaterial color="#f5a623" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Corner pillars */}
      {[
        [-0.7, -0.7],
        [0.7, -0.7],
        [-0.7, 0.7],
        [0.7, 0.7],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]}>
          <boxGeometry args={[0.1, 2.5, 0.1]} />
          <meshBasicMaterial color="#e8590c" wireframe />
        </mesh>
      ))}
    </group>
  );
}

// Floating Particles
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const particleCount = 80;

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
    
    if (geometryRef.current) {
      const positions = geometryRef.current.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.getElapsedTime() + i * 0.1) * 0.002;
      }
      
      geometryRef.current.attributes.position.needsUpdate = true;
    }
  });

  // Create positions array
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return arr;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f5a623"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Blueprint Grid
function BlueprintGrid() {
  return (
    <Grid
      position={[0, -2, 0]}
      args={[20, 20]}
      cellSize={0.5}
      cellThickness={0.5}
      cellColor="#f5a623"
      sectionSize={2}
      sectionThickness={1}
      sectionColor="#e8590c"
      fadeDistance={15}
      fadeStrength={1}
      infiniteGrid
    />
  );
}

// Floating Geometry Shapes
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating triangle */}
      <mesh position={[-4, 1, -2]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.3, 0.6, 3]} />
        <meshBasicMaterial color="#f5a623" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Floating cube */}
      <mesh position={[4, -0.5, -3]} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="#e8590c" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Floating ring */}
      <mesh position={[-3, -1, 2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.05, 8, 32]} />
        <meshBasicMaterial color="#f5a623" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Floating pyramid */}
      <mesh position={[3.5, 1.5, 1]} rotation={[0, Math.PI / 6, 0]}>
        <coneGeometry args={[0.3, 0.6, 4]} />
        <meshBasicMaterial color="#e8590c" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Main Hero Scene
export default function HeroScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [5, 3, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 5]} intensity={1} color="#f5a623" />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#e8590c" />

        <BuildingWireframe />
        <FloatingParticles />
        <BlueprintGrid />
        <FloatingShapes />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
