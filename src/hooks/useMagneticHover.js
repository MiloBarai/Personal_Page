import { useEffect, useRef } from 'react';
import { cursorState } from '../store/cursorState';

// Shared state to track currently magnetized element
let currentMagnetizedElement = null;

export const useMagneticHover = (strength = 0.5) => {
  const ref = useRef(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Add transition style when component mounts
    element.style.transition = 'transform 0.3s ease-out';

    const handleMouseEnter = () => {
      isHovered.current = true;
      cursorState.isHoveringMagnetic = true;
    };

    const handleMouseMove = (e) => {
      if (!isHovered.current) return;

      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const radius = width;

      if (distance < radius) {
        // Demagnetize previous element if it's different
        if (currentMagnetizedElement && currentMagnetizedElement !== element) {
          currentMagnetizedElement.style.transition = 'transform 0.3s ease-out';
          currentMagnetizedElement.style.transform = 'translate(0, 0) scale(1)';
        }
        
        // Update current magnetized element
        currentMagnetizedElement = element;
        
        // Remove transition when magnetized for instant response
        element.style.transition = 'transform 0s';
        const x = deltaX * strength;
        const y = deltaY * strength;
        element.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
      } else if (currentMagnetizedElement === element) {
        // Only demagnetize if this is the currently magnetized element
        currentMagnetizedElement = null;
        // Add transition back when returning to original position
        element.style.transition = 'transform 0.3s ease-out';
        element.style.transform = 'translate(0, 0) scale(1)';
      }
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      cursorState.isHoveringMagnetic = false;
      if (currentMagnetizedElement === element) {
        currentMagnetizedElement = null;
      }
      // Ensure smooth transition on mouse leave
      element.style.transition = 'transform 0.3s ease-out';
      element.style.transform = 'translate(0, 0) scale(1)';
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      // Clean up if this element was the magnetized one
      if (currentMagnetizedElement === element) {
        currentMagnetizedElement = null;
        cursorState.isHoveringMagnetic = false;
      }
    };
  }, [strength]);

  return ref;
}; 