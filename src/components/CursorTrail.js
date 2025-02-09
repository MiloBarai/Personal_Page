import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTrail = () => {
  const [points, setPoints] = useState([]);
  const maxPoints = 25;
  const lastRippleTime = useRef(0);
  const rippleCooldown = 100; // milliseconds between ripples

  useEffect(() => {
    const updateMousePosition = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastRippleTime.current >= rippleCooldown) {
        setPoints(prevPoints => {
          const newPoints = [...prevPoints, { x: e.clientX, y: e.clientY, timestamp: currentTime }];
          return newPoints.slice(-maxPoints);
        });
        lastRippleTime.current = currentTime;
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <svg className="w-full h-full">
        <AnimatePresence>
          {points.map((point) => (
            <motion.circle
              key={point.timestamp}
              cx={point.x}
              cy={point.y}
              r="8"
              fill="none"
              stroke="rgba(78, 204, 163, 0.5)"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ 
                scale: [0, 3],
                opacity: [0.8, 0],
                strokeWidth: [2, 0.5]
              }}
              transition={{ 
                duration: 1,
                ease: "easeOut",
                times: [0, 1]
              }}
              exit={{ opacity: 0 }}
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default CursorTrail; 