import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setOffset({
      x: (e.clientX - r.left - r.width / 2) * 0.22,
      y: (e.clientY - r.top - r.height / 2) * 0.32,
    });
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}
