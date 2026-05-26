import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Disable on devices with touch screens (mobile/tablet) for high performance
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track when hovering over clickable elements to pulse/expand the glow
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Initial attach and re-observe on dynamic rendering
    addHoverListeners();
    const interval = setInterval(addHoverListeners, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(interval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isHovered ? '250px' : '150px',
        height: isHovered ? '250px' : '150px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, rgba(250, 204, 21, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate3d(${position.x - (isHovered ? 125 : 75)}px, ${position.y - (isHovered ? 125 : 75)}px, 0)`,
        transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease',
        willChange: 'transform',
        filter: 'blur(10px)',
      }}
      aria-hidden="true"
    />
  );
}
