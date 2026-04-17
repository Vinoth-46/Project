import { useState, useEffect, useMemo } from 'react';

export type DeviceTier = 'high' | 'low' | 'fallback';

export function useDeviceTier() {
  const [tier, setTier] = useState<DeviceTier>('high');
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    // Performance detection
    const detectTier = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          setTier('fallback');
          return;
        }

        const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo ? (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
        const maxTextureSize = (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).MAX_TEXTURE_SIZE);

        // Simple tier logic
        const isLowEnd = 
          (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
          ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) ||
          maxTextureSize < 4096 ||
          /Mali|Adreno|Intel|Graphics/i.test(renderer);

        setTier(isLowEnd ? 'low' : 'high');
      } catch (e) {
        setTier('fallback');
      }
    };

    checkMobile();
    detectTier();
    
    window.addEventListener('resize', checkMobile);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  return useMemo(() => ({ tier, isMobile, prefersReducedMotion }), [tier, isMobile, prefersReducedMotion]);
}
