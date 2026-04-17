import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAvatarStore } from '../store/avatarStore';

export function useRobotAnimation(isMobile: boolean) {
  const { chatOpen, avatarMood } = useAvatarStore();
  const headRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Idle Animations
    if (antennaRef.current) {
      antennaRef.current.position.y = 0.6 + Math.sin(t * 3) * 0.05;
    }

    // 2. Desktop Cursor Tracking
    if (!isMobile && !chatOpen && headRef.current && eyesRef.current) {
      const targetX = state.mouse.x * 0.4; // max tilt
      const targetY = state.mouse.y * 0.2;

      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.05);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.05);

      // Eyes follow slightly faster/further
      eyesRef.current.rotation.y = THREE.MathUtils.lerp(eyesRef.current.rotation.y, targetX * 1.5, 0.1);
      eyesRef.current.rotation.x = THREE.MathUtils.lerp(eyesRef.current.rotation.x, -targetY * 1.5, 0.1);
    }

    // 3. Thinking / Talking Moods
    if (chatOpen || avatarMood === 'thinking') {
      if (headRef.current) {
        headRef.current.position.y = Math.sin(t * 2) * 0.02;
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0, 0.05);
      }
    }
  });

  return { headRef, eyesRef, antennaRef };
}
