'use client';

import { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bvh } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from '../../hooks/useInView';
import { ConstructionScene } from './building/ConstructionScene';
import { DashboardUI } from './building/DashboardUI';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

function CameraZoomManager({ zoom }: { zoom: number }) {
  const { camera } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 45 / zoom;
      camera.zoom = Math.sqrt(zoom); // Compound zoom for stronger effect
      camera.updateProjectionMatrix();
    }
  }, [zoom, camera]);
  return null;
}

export default function BuildingModel() {
  const [dayMode, setDayMode] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [sectionCut, setSectionCut] = useState(false);
  const [measurementMode, setMeasurementMode] = useState(false);
  const [replayTrigger, setReplayTrigger] = useState(0);
  const [zoom, setZoom] = useState(0.5);
  const [containerRef, isInView] = useInView({ threshold: 0.1 });

  const handleReplay = useCallback(() => {
    setReplayTrigger(prev => prev + 1);
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  const stats = {
    floors: 3,
    height: 9.0,
    area: 48,
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        minHeight: '420px',
        backgroundColor: dayMode ? '#f8fafc' : '#020617',
        transition: 'background-color 1s ease-in-out'
      }}
    >
      {isInView && (
        <>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [8, 3, 10], fov: 45 }}
            gl={{ 
              antialias: true, 
              toneMapping: THREE.ACESFilmicToneMapping, 
              toneMappingExposure: dayMode ? 1 : 0.5,
              localClippingEnabled: true 
            }}
            onCreated={({ gl }) => {
              gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }}
          >
            <CameraZoomManager zoom={zoom} />
            <Bvh firstHitOnly>
              <ConstructionScene 
                dayMode={dayMode}
                wireframeMode={wireframeMode}
                sectionCut={sectionCut}
                measurementMode={measurementMode}
                onFinishedIntro={() => {}}
                replayTrigger={replayTrigger}
              />
            </Bvh>

            <OrbitControls 
              makeDefault
              enablePan={false}
              enableZoom={false}
              minPolarAngle={0.1}
              maxPolarAngle={Math.PI / 2}
              dampingFactor={0.05}
              enableDamping={true}
            />
          </Canvas>

          <DashboardUI 
            dayMode={dayMode}
            setDayMode={setDayMode}
            wireframeMode={wireframeMode}
            setWireframeMode={setWireframeMode}
            sectionCut={sectionCut}
            setSectionCut={setSectionCut}
            measurementMode={measurementMode}
            setMeasurementMode={setMeasurementMode}
            onReplay={handleReplay}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            stats={stats}
          />
        </>
      )}

      {!isInView && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-brand-primary/20 font-bold uppercase tracking-[0.3em] text-[10px]">
            Initializing Engineering System...
          </p>
        </div>
      )}
    </div>
  );
}