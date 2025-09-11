'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useMediaQuery from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

/**
 * Calculates the initial translation and 3D rotation of an element, moving and rotating it further away from the center of the screen.
 * The rotation and Z-axis translation are proportional to the distance from the center, with elements near the center rotating less and moving less in Z.
 * 
 * @param {Element} element - The DOM element to calculate the translation and rotation for
 * @param {Number} offsetDistance - The distance by which the element will be moved away from the center (default: 250px)
 * @param {Number} maxRotation - The maximum rotation in degrees for farthest elements (default: 300 degrees)
 * @param {Number} maxZTranslation - The maximum Z-axis translation in pixels for farthest elements (default: 2000px)
 * @returns {Object} The x, y, z translation and rotateX, rotateY values as {x, y, z, rotateX, rotateY}
 */
const calculateInitialTransform = (element, offsetDistance = 250, maxRotation = 300, maxZTranslation = 2000) => {
    const viewportCenter = { width: window.innerWidth / 2, height: window.innerHeight / 2 };
    const elementCenter = {
        x: element.offsetLeft + element.offsetWidth / 2,
        y: element.offsetTop + element.offsetHeight / 2
    };

    // Calculate the angle between the center of the element and the center of the viewport
    const angle = Math.atan2(Math.abs(viewportCenter.height - elementCenter.y), Math.abs(viewportCenter.width - elementCenter.x));

    // Calculate the x and y translation based on the angle and distance
    const translateX = Math.abs(Math.cos(angle) * offsetDistance);
    const translateY = Math.abs(Math.sin(angle) * offsetDistance);

    // Calculate the maximum possible distance from the center (diagonal of the viewport)
    const maxDistance = Math.sqrt(Math.pow(viewportCenter.width, 2) + Math.pow(viewportCenter.height, 2));

    // Calculate the current distance from the center
    const currentDistance = Math.sqrt(Math.pow(viewportCenter.width - elementCenter.x, 2) + Math.pow(viewportCenter.height - elementCenter.y, 2));

    // Scale rotation and Z-translation based on distance from the center (closer elements rotate/translate less, farther ones rotate/translate more)
    const distanceFactor = currentDistance / maxDistance;

    // Calculate the rotation values based on the position relative to the center
    const rotationX = ((elementCenter.y < viewportCenter.height ? -1 : 1) * (translateY / offsetDistance) * maxRotation * distanceFactor);
    const rotationY = ((elementCenter.x < viewportCenter.width ? 1 : -1) * (translateX / offsetDistance) * maxRotation * distanceFactor);

    // Calculate the Z-axis translation (depth) based on the distance from the center
    const translateZ = maxZTranslation * distanceFactor;

    // Determine direction based on position relative to the viewport center
    return {
        x: (elementCenter.x < viewportCenter.width ? -translateX : translateX) * 0.8,
        y: (elementCenter.y < viewportCenter.height ? -translateY : translateY) * 0.8,
        z: translateZ * 0.8,
        rotateX: rotationX * 1.5,
        rotateY: rotationY * 1.5
    };
};

const AnimatedAssetsGrid = ({ images, className, columnsDesktop = 9, rowsDesktop = 4, columnsMobile = 3, rowsMobile = 4 }) => {
    const containerRef = useRef(null);
    const gridRef = useRef(null);
    const gridItemsRef = useRef(Array(36).fill(null));
    const [initialTransforms, setInitialTransforms] = useState(Array(36).fill(null));

    const columns = useMediaQuery("(min-width: 1024px)") ? columnsDesktop : columnsMobile;
    const rows = useMediaQuery('(min-width: 1024px)') ? rowsDesktop : rowsMobile;

    const tempGridClass = cn(
        'grid gap-0 w-full h-screen',
        `grid-cols-${columnsMobile} lg:grid-cols-${columnsDesktop}`,
        `grid-rows-${rowsMobile} lg:grid-rows-${rowsDesktop}`
    )

    const gridClass = cn(
        'grid gap-0 grid-cols-3 lg:grid-cols-9 grid-rows-4 lg:grid-rows-4 w-full h-screen sticky top-0 overflow-hidden',
        `grid-cols-${columnsMobile} lg:grid-cols-${columnsDesktop}`,
        `grid-rows-${rowsMobile} lg:grid-rows-${rowsDesktop}`
    )

    // Calculate initial transforms once elements are mounted
    useEffect(() => {
        if (!gridRef.current || typeof window === 'undefined') return;

        // Wait for DOM to be fully rendered
        const timer = setTimeout(() => {
            // Create temporary grid to measure positions
            const tempGrid = document.createElement('div');
            tempGrid.className = tempGridClass;
            tempGrid.style.position = 'absolute';
            tempGrid.style.top = '0';
            tempGrid.style.left = '0';
            tempGrid.style.visibility = 'hidden';
            document.body.appendChild(tempGrid);

            const tempItems = [];
            for (let i = 0; i < 36; i++) {
                const item = document.createElement('div');
                item.style.gridColumn = `${(i % columns) + 1}`;
                item.style.gridRow = `${Math.floor(i / columns) + 1}`;
                tempGrid.appendChild(item);
                tempItems.push(item);
            }

            // Calculate positions using the original calculation function
            const transforms = tempItems.map(item =>
                calculateInitialTransform(item, 900, -160, -3000)
            );

            // Clean up temporary elements
            document.body.removeChild(tempGrid);

            setInitialTransforms(transforms);
        }, 100);

        return () => clearTimeout(timer);
    }, [columns]);

    // total number of cells based on grid size
    const totalCells = columns * rows;

    // randomly select unique positions for N images
    const getRandomPositions = (count, total) => {
        const positions = new Set();
        while (positions.size < count) {
            positions.add(Math.floor(Math.random() * total));
        }
        return Array.from(positions);
    };

    const selectedPositions = getRandomPositions(10, totalCells);

    // Create a 9x4 grid (36 items)
    const gridItems = selectedPositions.map((cellIndex, index) => {
        const imageIndex = index % images.length;
        const rowIndex = Math.floor(cellIndex / columns);
        const colIndex = cellIndex % columns;

        // distance from center for stagger
        const distanceFromCenter = Math.sqrt(
            Math.pow(colIndex - columns / 2, 2) +
            Math.pow(rowIndex - rows / 2, 2)
        );

        const staggerDelay = distanceFromCenter * 0.15;

        const initialTransform = initialTransforms[cellIndex] || {
            x: colIndex < Math.floor(columns / 2) ? -900 : 900,
            y: rowIndex < Math.floor(rows / 2) ? -600 : 600,
            z: -3000,
            rotateX: (rowIndex < Math.floor(rows / 2) ? 1 : -1) * 160,
            rotateY: (colIndex < Math.floor(columns / 2) ? -1 : 1) * 160
        };

        return (
            <motion.div
                key={cellIndex}
                className="grid__img"
                style={{
                    gridColumn: colIndex + 1,
                    gridRow: rowIndex + 1,
                    backgroundImage: `url(${images[imageIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden'
                }}
                initial={{
                    x: initialTransform.x,
                    y: initialTransform.y,
                    z: initialTransform.z,
                    rotateX: initialTransform.rotateX,
                    rotateY: initialTransform.rotateY,
                    opacity: 0,
                    scale: 0.4
                }}
                animate={{
                    x: 0,
                    y: 0,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    opacity: 1,
                    scale: 1
                }}
                transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 18,
                    delay: staggerDelay
                }}
            />
        );
    });



    // Effect to trigger animations on scroll
    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (!gridRef.current || initialTransforms.some(t => t === null)) return;

    //         const gridItems = gridRef.current.querySelectorAll('.grid__img');
    //         const windowHeight = window.innerHeight;
    //         const parent = gridRef.current.parentElement;
    //         const parentRect = parent.getBoundingClientRect();

    //         // Calculate how far the grid is from the center of the viewport
    //         const distanceFromCenter = Math.max(parentRect.top + parentRect.height - windowHeight, 0);

    //         // Calculate animation progress (0 when grid is centered in viewport, 1 when far away)
    //         const progress = Math.min(1, distanceFromCenter / (windowHeight));

    //         // Apply animation to each grid item
    //         gridItems.forEach((item, index) => {
    //             // Get the pre-calculated initial transform
    //             const initialTransform = initialTransforms[index] || {
    //                 x: 0, y: 0, z: -3000, rotateX: 0, rotateY: 0
    //             };

    //             // Calculate current transform values based on scroll progress
    //             const transform = {
    //                 x: initialTransform.x * progress,
    //                 y: initialTransform.y * progress,
    //                 z: initialTransform.z * progress,
    //                 rotateX: initialTransform.rotateX * progress,
    //                 rotateY: initialTransform.rotateY * progress,
    //                 opacity: 1 - (0.8 * progress),
    //                 scale: 1 - (0.6 * progress)
    //             };

    //             // Apply transform to the element
    //             item.style.transform = `translate3d(${transform.x}px, ${transform.y}px, ${transform.z}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`;
    //             item.style.opacity = transform.opacity;
    //         });
    //     };

    //     // Add scroll event listener
    //     window.addEventListener('scroll', handleScroll);

    //     // Initial call to set positions
    //     handleScroll();

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [initialTransforms, columns]);


    return (
        <div
            ref={containerRef}
            className={className} // Make container tall enough for scrolling
        >
            <div
                ref={gridRef}
                className={gridClass}
                style={{ perspective: '1500px' }}
            >
                {gridItems}
            </div>
        </div>
    );
};

export default AnimatedAssetsGrid;
