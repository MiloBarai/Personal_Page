import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cursorState } from '../store/cursorState';

const CursorTrail = () => {
  const [points, setPoints] = useState([]);
  const maxPoints = 20; // Increased for smoother trail
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const updateInterval = 16; // Decreased for more frequent updates (60fps)

  const isInHeroSection = (mouseY) => {
    const heroSection = document.querySelector('section');
    if (!heroSection) return false;
    const { top, bottom } = heroSection.getBoundingClientRect();
    return mouseY >= top && mouseY <= bottom;
  };

  useEffect(() => {
    const updateMousePosition = (e) => {
      if (cursorState.isHoveringMagnetic || !isInHeroSection(e.clientY)) {
        setPoints([]);
        return;
      }

      const currentTime = Date.now();
      if (currentTime - lastUpdateTime.current < updateInterval) return;

      lastUpdateTime.current = currentTime;
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        timestamp: currentTime
      };

      setPoints(prevPoints => {
        const newPoints = [...prevPoints, newPoint];
        return newPoints.slice(-maxPoints);
      });

      lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <svg className="w-full h-full">
        <AnimatePresence>
          {points.map((point, index) => (
            index > 0 && (
              <motion.line
                key={point.timestamp}
                x1={points[index - 1].x}
                y1={points[index - 1].y}
                x2={point.x}
                y2={point.y}
                stroke="rgba(78, 204, 163, 0.5)"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ opacity: 0.5, pathLength: 0 }}
                animate={{ opacity: 0, pathLength: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default CursorTrail; 