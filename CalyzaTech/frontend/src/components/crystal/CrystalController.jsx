import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';

const CrystalContext = createContext(null);

export const useCrystal = () => useContext(CrystalContext);

export function CrystalController({ targetRef, children }) {
  const pointer = useRef({ x: 0, y: 0 });
  const hoverTone = useRef(null);
  const [stageInView, setStageInView] = useState(true);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const target = targetRef?.current;
    if (!target) return undefined;
    const io = new IntersectionObserver(([entry]) => setStageInView(entry.isIntersecting), { threshold: 0 });
    io.observe(target);
    return () => io.disconnect();
  }, [targetRef]);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <CrystalContext.Provider value={{ progress: scrollYProgress, pointer, stageInView, hoverTone }}>
      {children}
    </CrystalContext.Provider>
  );
}
