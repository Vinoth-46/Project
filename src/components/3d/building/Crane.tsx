import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Edges } from '@react-three/drei';

export const Crane = ({ position, rotation = [0, 0, 0], targetY = -2, wireframe, clippingPlanes }: any) => {
  const armRef = useRef<THREE.Group>(null);
  const hookRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (armRef.current) {
      // Restrict swivel range: 0.8 -> 0.35 (Focused on building)
      armRef.current.rotation.y = Math.sin(time * 0.6) * 0.35;
    }
    if (hookRef.current) {
      // Align hook vertical move with the target construction floor
      hookRef.current.position.y = targetY + Math.sin(time * 1.5) * 1;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Base Tower */}
      <mesh castShadow position={[0, 6, 0]}>
        <boxGeometry args={[0.4, 12, 0.4]} />
        <meshStandardMaterial color="#facc15" metalness={0.8} roughness={0.2} wireframe={wireframe} clippingPlanes={clippingPlanes} />
        <Edges color="#444" />
      </mesh>

      {/* Rotating Arm */}
      <group ref={armRef} position={[0, 12, 0]}>
        {/* Counter weight arm */}
        <mesh position={[-1.5, 0, 0]} castShadow>
          <boxGeometry args={[3, 0.3, 0.3]} />
          <meshStandardMaterial color="#333" wireframe={wireframe} clippingPlanes={clippingPlanes} />
        </mesh>
        {/* Main Jib */}
        <mesh position={[4, 0, 0]} castShadow>
          <boxGeometry args={[8, 0.3, 0.3]} />
          <meshStandardMaterial color="#facc15" wireframe={wireframe} clippingPlanes={clippingPlanes} />
          <Edges color="#444" />
        </mesh>
        {/* Operator Cabin */}
        <mesh position={[0.5, -0.4, 0.4]} castShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#111" wireframe={wireframe} clippingPlanes={clippingPlanes} />
        </mesh>

        {/* Cable & Hook */}
        <group position={[7.5, 0, 0]}>
          <mesh position={[0, -2, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 4]} />
            <meshStandardMaterial color="#555" />
          </mesh>
          <group ref={hookRef} position={[0, -2, 0]}>
            <mesh castShadow>
              <octahedronGeometry args={[0.2]} />
              <meshStandardMaterial color="#333" emissive="#facc15" emissiveIntensity={0.2} />
            </mesh>
            {/* LOAD BLOCK */}
            <mesh position={[0, -0.4, 0]} castShadow>
              <boxGeometry args={[0.6, 0.6, 0.6]} />
              <meshStandardMaterial color="#d4c5a9" metalness={0.1} roughness={0.8} />
              <Edges color="#666" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
