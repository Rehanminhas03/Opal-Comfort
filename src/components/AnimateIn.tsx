'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right';

type AnimateInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
  duration?: number;
};

function offsetFor(direction: Direction) {
  switch (direction) {
    case 'left':
      return { x: 40, y: 0 };
    case 'right':
      return { x: -40, y: 0 };
    case 'up':
    default:
      return { x: 0, y: 40 };
  }
}

export default function AnimateIn({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  duration = 0.7,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();
  const offset = offsetFor(direction);

  // Reduced-motion: render in place, no movement or fade-up.
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
