'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * A component that creates a parallax scrolling effect for images using Framer Motion.
 * The image moves vertically as the user scrolls, creating a dynamic visual effect.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes to apply to the container
 * @param {string} props.img - Source URL of the image
 * @param {string} props.alt - Alt text for the image
 * @param {number} [props.power=1.5] - Intensity of the parallax effect (1 = no effect, >1 = stronger effect)
 * @param {boolean} [props.fill=false] - Whether the image should fill its container
 * @param {number} [props.scale=1.15] - Initial scale of the image (helps prevent empty edges during parallax)
 * @param {boolean} [props.priority=false] - Whether to prioritize image loading
 * @param {number} [props.width] - Width of the image (only used when fill=false)
 * @param {number} [props.height] - Height of the image (only used when fill=false)
 *
 * @example
 * // Basic usage with container-filling image
 * <ParallaxImage
 *   img="/path/to/image.jpg"
 *   alt="Description"
 *   fill={true}
 * />
 *
 * @example
 * // Custom parallax intensity and scale
 * <ParallaxImage
 *   img="/path/to/image.jpg"
 *   alt="Description"
 *   power={2}
 *   scale={1.3}
 *   fill={true}
 * />
 */
export default function ParallaxImage({
    className,
    img,
    alt,
    power = 1.5,
    fill = false,
    scale = 1.15,
    priority = false,
    width,
    height,
}) {
    // Reference to the container element for scroll tracking
    const ref = useRef(null);

    // Track scroll progress relative to the component's viewport visibility
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'], // Track from when component enters viewport until it leaves
    });

    // Calculate the range of vertical movement based on parallax power
    const rangePercentage = ((power - 1) * 100) / 2;

    // Transform scroll progress (0-1) into vertical translation percentage
    const translateY = useTransform(
        scrollYProgress,
        [0, 1],
        [`-${rangePercentage}%`, `${rangePercentage}%`]
    );

    // Combine provided classes with conditional fill styling
    const classes = `origin-center-bottom absolute inset-0 transform-gpu overflow-hidden object-cover ${className}`;

    return (
        <div className={classes} ref={ref}>
            <motion.div
                className="relative h-full min-w-full"
                initial={{ scale: 1.15, translateY: 0 }}
                style={{ scale: scale, translateY: translateY }}
            >
                <Image
                    className="object-cover"
                    src={img}
                    alt={alt}
                    priority={priority}
                    fill={fill}
                    width={!fill ? width : undefined}
                    height={!fill ? height : undefined}
                />
            </motion.div>
        </div>
    );
}

ParallaxImage.propTypes = {
    className: PropTypes.string,
    img: PropTypes.string,
    alt: PropTypes.string,
    power: PropTypes.number,
    fill: PropTypes.bool,
    scale: PropTypes.number,
    priority: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
};