import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the device supports hover (desktop mouse pointer)
    const hasHover = window.matchMedia('(hover: hover) and (min-width: 1024px)').matches;
    if (!hasHover) return;

    setIsVisible(true);

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animateCursor = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      
      // Interpolate with 0.15 dampening factor for smooth spring-like feel
      currentX += dx * 0.15;
      currentY += dy * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentX}px`;
        cursorRef.current.style.top = `${currentY}px`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    // Event delegation to check if hovering interactive elements
    const handleMouseOver = (e) => {
      if (!e.target) return;
      const interactiveEl = e.target.closest('a, button, .portfolio-item, input, textarea, [role="button"]');
      if (interactiveEl) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
    />
  );
}
