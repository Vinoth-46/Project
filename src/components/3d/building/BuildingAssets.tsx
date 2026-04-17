import { useMemo } from 'react';
import { Edges } from '@react-three/drei';


export const Beam = ({ position, size, color = '#d4c5a9', wireframe, clippingPlanes }: any) => {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.6} 
        roughness={0.2} 
        wireframe={wireframe}
        clippingPlanes={clippingPlanes}
        clipShadows
      />
      <Edges color="#444" threshold={15} />
    </mesh>
  );
};

export const Column = ({ position, h, wireframe, clippingPlanes }: any) => {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, h / 2, 0]}>
        <boxGeometry args={[0.3, h, 0.3]} />
        <meshStandardMaterial 
          color="#e8e0d0" 
          metalness={0.1} 
          roughness={0.5} 
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
        <Edges color="#666" />
      </mesh>
      {/* Capital detail */}
      <mesh position={[0, h - 0.05, 0]} castShadow>
        <boxGeometry args={[0.38, 0.1, 0.38]} />
        <meshStandardMaterial color="#f0e8d8" clippingPlanes={clippingPlanes} wireframe={wireframe} />
        <Edges color="#666" />
      </mesh>
    </group>
  );
};

export const FloorSlab = ({ position, size, wireframe, clippingPlanes, color = '#c8baa0' }: any) => {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.7} 
        wireframe={wireframe}
        clippingPlanes={clippingPlanes}
        clipShadows
      />
      <Edges color="#333" />
    </mesh>
  );
};

export const Scaffolding = ({ buildingSize, wireframe, clippingPlanes }: any) => {
  const [w, h, d] = buildingSize;
  const countX = Math.ceil(w / 1.5);
  const countY = Math.ceil(h / 2);

  const lines = useMemo(() => {
    const temp = [];
    const poleHeight = h + 1;
    const poleY = h / 2 + 0.5;

    // Horizontal bars (Floors coverage)
    for (let iy = 0; iy < countY; iy++) {
      const y = iy * 2;
      temp.push(<Beam key={`hfb-${iy}`} position={[0, y, d / 2 + 0.5]} size={[w + 1, 0.05, 0.05]} color="#777" wireframe={wireframe} clippingPlanes={clippingPlanes} />);
      temp.push(<Beam key={`hbb-${iy}`} position={[0, y, -d / 2 - 0.5]} size={[w + 1, 0.05, 0.05]} color="#777" wireframe={wireframe} clippingPlanes={clippingPlanes} />);
    }

    // Top Ring (Horizontal connection at the peak)
    const topY = h + 0.5;
    temp.push(<Beam key="top-front" position={[0, topY, d / 2 + 0.5]} size={[w + 1.1, 0.06, 0.06]} color="#888" wireframe={wireframe} clippingPlanes={clippingPlanes} />);
    temp.push(<Beam key="top-back" position={[0, topY, -d / 2 - 0.5]} size={[w + 1.1, 0.06, 0.06]} color="#888" wireframe={wireframe} clippingPlanes={clippingPlanes} />);
    temp.push(<Beam key="top-left" position={[-w / 2 - 0.5, topY, 0]} size={[0.06, 0.06, d + 1.1]} color="#888" wireframe={wireframe} clippingPlanes={clippingPlanes} />);
    temp.push(<Beam key="top-right" position={[w / 2 + 0.5, topY, 0]} size={[0.06, 0.06, d + 1.1]} color="#888" wireframe={wireframe} clippingPlanes={clippingPlanes} />);

    // Vertical poles (Front & Back)
    for (let ix = 0; ix <= countX; ix++) {
      const x = -w / 2 - 0.5 + (ix * (w + 1) / countX);
      // Front poles
      temp.push(<mesh key={`vpf-${ix}`} position={[x, poleY, d / 2 + 0.5]}>
        <cylinderGeometry args={[0.03, 0.03, poleHeight]} />
        <meshStandardMaterial color="#666" clippingPlanes={clippingPlanes} wireframe={wireframe} />
      </mesh>);
      // Back poles
      temp.push(<mesh key={`vpb-${ix}`} position={[x, poleY, -d / 2 - 0.5]}>
        <cylinderGeometry args={[0.03, 0.03, poleHeight]} />
        <meshStandardMaterial color="#666" clippingPlanes={clippingPlanes} wireframe={wireframe} />
      </mesh>);
    }
    return temp;
  }, [w, h, d, countX, countY, wireframe, clippingPlanes]);

  return <group>{lines}</group>;
};

export const Engineer = ({ position, rotation = [0, 0, 0], clippingPlanes }: any) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Legs */}
      <mesh position={[-0.12, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.05, 0.8]} />
        <meshStandardMaterial color="#223344" clippingPlanes={clippingPlanes} />
      </mesh>
      <mesh position={[0.12, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.05, 0.8]} />
        <meshStandardMaterial color="#223344" clippingPlanes={clippingPlanes} />
      </mesh>
      
      {/* Body / Vest */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.45, 0.7, 0.25]} />
        <meshStandardMaterial color="#ff6600" clippingPlanes={clippingPlanes} /> {/* Safety Orange */}
      </mesh>
      {/* Shirt under vest */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.48, 0.6, 0.2]} />
        <meshStandardMaterial color="#ffffff" clippingPlanes={clippingPlanes} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#f5d0b0" clippingPlanes={clippingPlanes} />
      </mesh>

      {/* SAFETY HELMET */}
      <group position={[0, 1.72, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.17, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#facc15" side={2} clippingPlanes={clippingPlanes} />
        </mesh>
        {/* Brim */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.3, 0.02, 0.4]} />
          <meshStandardMaterial color="#facc15" clippingPlanes={clippingPlanes} />
        </mesh>
      </group>

      {/* Arms */}
      <mesh position={[-0.3, 1.2, 0]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.05, 0.04, 0.6]} />
        <meshStandardMaterial color="#ffffff" clippingPlanes={clippingPlanes} />
      </mesh>
      <mesh position={[0.3, 1.2, 0]} rotation={[0, 0, -0.2]} castShadow>
        <cylinderGeometry args={[0.05, 0.04, 0.6]} />
        <meshStandardMaterial color="#ffffff" clippingPlanes={clippingPlanes} />
      </mesh>
    </group>
  );
};
