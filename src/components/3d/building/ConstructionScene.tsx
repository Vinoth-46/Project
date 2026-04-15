import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  ContactShadows, 
  Stars, 
  Sky, 
  Environment, 
  Html,
  Edges
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Beam, Column, FloorSlab, Scaffolding, Engineer } from './BuildingAssets';
import { Crane } from './Crane';

interface SceneProps {
  dayMode: boolean;
  wireframeMode: boolean;
  sectionCut: boolean;
  measurementMode: boolean;
  onFinishedIntro: () => void;
  replayTrigger: number;
}

export const ConstructionScene = ({ 
  dayMode, 
  wireframeMode, 
  sectionCut, 
  measurementMode, 
  onFinishedIntro,
  replayTrigger
}: SceneProps) => {
  const { camera } = useThree();
  const [points, setPoints] = useState<THREE.Vector3[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const buildingGroup = useRef<THREE.Group>(null);
  
  // Section cut plane logic
  const clippingPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 10), []);
  const clippingPlanes = useMemo(() => sectionCut ? [clippingPlane] : [], [sectionCut, clippingPlane]);

  // Animate clipping plane
  useFrame((_, delta) => {
    if (sectionCut) {
      clippingPlane.constant = THREE.MathUtils.lerp(clippingPlane.constant, 4, delta * 2);
    } else {
      clippingPlane.constant = THREE.MathUtils.lerp(clippingPlane.constant, 15, delta * 2);
    }
  });

  // Intro Animation
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('v2_intro_played');
    if (!hasPlayed || replayTrigger > 0) {
      camera.position.set(20, 15, 20);
      gsap.to(camera.position, {
        x: 10, y: 5, z: 12,
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
          sessionStorage.setItem('v2_intro_played', 'true');
          onFinishedIntro();
        }
      });
    }
  }, [replayTrigger]);

  // Measurement Logic
  const handlePointerDown = (e: any) => {
    if (!measurementMode) return;
    e.stopPropagation();
    
    if (points.length >= 2) {
      setPoints([e.point]);
      setDistance(null);
    } else {
      const newPoints = [...points, e.point];
      setPoints(newPoints);
      if (newPoints.length === 2) {
        setDistance(newPoints[0].distanceTo(newPoints[1]));
      }
    }
  };
  // Sequential Construction Logic
  const [phase, setPhase] = useState(0); // 0: Ground, 1: Mid, 2: Roof
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 3);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getTargetY = () => {
    if (phase === 0) return -2;
    if (phase === 1) return 1;
    return 4;
  };

  // Building Structure
  const FLOORS = [0, 3, 6];
  const floorHeight = 2.8;

  return (
    <group onPointerDown={handlePointerDown}>
      {/* Environment */}
      <Sky sunPosition={dayMode ? [10, 10, 5] : [-10, -5, -10]} />
      <Stars radius={100} depth={50} count={dayMode ? 0 : 5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset={dayMode ? "city" : "night"} />
      
      <ambientLight intensity={dayMode ? 0.5 : 0.05} />
      <directionalLight 
        position={[10, 20, 5]} 
        intensity={dayMode ? 1.5 : 0.1} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
      {/* Night site lighting */}
      {!dayMode && (
        <group>
          <pointLight position={[5, 5, 5]} intensity={2} color="#facc15" distance={15} />
          <pointLight position={[-5, 5, -5]} intensity={1} color="#facc15" distance={15} />
          <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#fff" castShadow />
        </group>
      )}

      {/* Building */}
      <group ref={buildingGroup} position={[0, -2, 0]}>
        {FLOORS.map((fy, i) => (
          <group key={i} position={[0, fy, 0]}>
            <FloorSlab size={[8, 0.2, 6]} wireframe={wireframeMode} clippingPlanes={clippingPlanes} />
            <Column position={[-3.8, 0, -2.8]} h={floorHeight} wireframe={wireframeMode} clippingPlanes={clippingPlanes} />
            <Column position={[3.8, 0, -2.8]} h={floorHeight} wireframe={wireframeMode} clippingPlanes={clippingPlanes} />
            <Column position={[-3.8, 0, 2.8]} h={floorHeight} wireframe={wireframeMode} clippingPlanes={clippingPlanes} />
            <Column position={[3.8, 0, 2.8]} h={floorHeight} wireframe={wireframeMode} clippingPlanes={clippingPlanes} />
            
            {/* Beams */}
            <Beam position={[0, floorHeight, 2.8]} size={[8, 0.2, 0.2]} wireframe={wireframeMode} clippingPlanes={clippingPlanes} />
            <Beam position={[0, floorHeight, -2.8]} size={[8, 0.2, 0.2]} wireframe={wireframeMode} clippingPlanes={clippingPlanes} />
          </group>
        ))}
        <Scaffolding buildingSize={[8.5, 9, 6.5]} wireframe={wireframeMode} clippingPlanes={clippingPlanes} />
      </group>

      {/* Crane (Synchronized with construction phase) */}
      <Crane position={[5, -2, 3]} rotation={[0, 3.68, 0]} targetY={getTargetY()} wireframe={wireframeMode} clippingPlanes={clippingPlanes} />

      {/* Engineers */}
      <Engineer position={[2, -2, 4]} rotation={[0, -0.5, 0]} clippingPlanes={clippingPlanes} />
      <Engineer position={[-1.5, -2, 3.5]} rotation={[0, 0.8, 0]} clippingPlanes={clippingPlanes} />

      {/* ACTIVE CONSTRUCTION LOOP */}
      {/* Ground Floor Side Wall */}
      {(phase === 0) && (
        <group position={[-3.95, -2, -1]}>
          <mesh castShadow scale-y={0.5 + Math.sin(Date.now() * 0.003) * 0.5} position={[0, 1.5, 0]}>
            <boxGeometry args={[0.2, 3, 2]} />
            <meshStandardMaterial color="#8a8375" clippingPlanes={clippingPlanes} />
            <Edges color="#444" />
          </mesh>
        </group>
      )}

      {/* Mid Floor Side Wall */}
      {(phase === 1) && (
        <group position={[3.95, 1, 1]}>
          <mesh castShadow scale-y={0.5 + Math.sin(Date.now() * 0.003) * 0.5} position={[0, 1.5, 0]}>
            <boxGeometry args={[0.2, 3, 2]} />
            <meshStandardMaterial color="#8a8375" clippingPlanes={clippingPlanes} />
            <Edges color="#444" />
          </mesh>
        </group>
      )}

      {/* Roof Wall Segment */}
      {(phase === 2) && (
        <group position={[3.95, 6, 0]}>
          <mesh castShadow scale-y={0.2 + Math.sin(Date.now() * 0.003) * 0.4} position={[0, 1.25, 0]}>
            <boxGeometry args={[0.2, 2.5, 2]} />
            <meshStandardMaterial color="#d4c5a9" clippingPlanes={clippingPlanes} />
            <Edges color="#666" />
          </mesh>
        </group>
      )}

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.01, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={dayMode ? "#222" : "#050505"} roughness={0.8} />
      </mesh>
      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2.4} far={4.5} />

      {/* Measurement Markers */}
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      ))}
      {points.length === 2 && (
        <group>
          <line>
            <bufferGeometry attach="geometry" onUpdate={self => self.setFromPoints(points)} />
            <lineBasicMaterial attach="material" color="#facc15" linewidth={2} />
          </line>
          <Html position={points[0].clone().add(points[1]).multiplyScalar(0.5)}>
            <div className="bg-brand-accent text-slate-900 px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap shadow-lg">
              {distance?.toFixed(2)} m
            </div>
          </Html>
        </group>
      )}

      {/* Static Measurement Lines (Pre-highlights) */}
      <group position={[0, -2, 0]}>
        <Beam position={[-4.5, 4.5, 0]} size={[0.02, 9, 0.02]} color="#facc15" emissive="#facc15" emissiveIntensity={0.5} />
        <Html position={[-4.5, 9, 0]}>
          <div className="text-[#facc15] text-[9px] font-bold uppercase opacity-50">Height: 9.0m</div>
        </Html>
      </group>
    </group>
  );
};
