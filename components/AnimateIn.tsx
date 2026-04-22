'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type AnimateInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  duration?: number;
};

export default function AnimateIn({
  children,
  delay = 0,
  className = '',
  y = 40,
  duration = 0.7,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
