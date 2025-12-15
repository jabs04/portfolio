import React, { type ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface ScrollAnimationWrapperProps {
    children: ReactNode;
    variants?: Variants;
    className?: string;
    delay?: number;
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
    children,
    variants,
    className = '',
    delay = 0
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimationWrapper;
