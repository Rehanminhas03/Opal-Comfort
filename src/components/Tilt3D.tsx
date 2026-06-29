'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Subtle cursor-driven 3D tilt for cards. Springy, capped, and a no-op on touch
 * devices or when the user prefers reduced motion.
 *
 * To avoid hydration mismatches it renders the SAME element on the server and on
 * first client render (no 3D), then enables the tilt only after mount (deferred),
 * once we can safely read pointer/motion capabilities.
 */
export default function Tilt3D({
  children,
  className = '',
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.3 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.3 });

  useEffect(() => {
    // Deferred (not a synchronous setState in the effect body) and runs only
    // after hydration, so server and first client render stay identical.
    const t = setTimeout(() => {
      if (!reduce && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) {
        setEnabled(true);
      }
    }, 0);
    return () => clearTimeout(t);
  }, [reduce]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(dx * max * 2);
    rx.set(-dy * max * 2);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={enabled ? handleMove : undefined}
      onPointerLeave={enabled ? reset : undefined}
      style={
        enabled
          ? { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
