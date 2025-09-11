
"use client";

import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';
import AnimatedAssetsGrid from '@/elements/AnimatedAssetsGrid';
import TextRevealBlur from '@/elements/TextRevealBlur';
import { motion } from 'framer-motion';

const tempImages = Array.from({ length: 3 }, (_, i) => `/placeholder_${(i % 3) + 1}.jpg`);

const Hero = ({
    id = "hero",
    gridImages = tempImages,
    className = "",
    backgroundDarken = false,
}) => {

    const images = gridImages?.[0]?.file ? gridImages.map(image => image.file) : tempImages

    return (
        <div>
            <section
                id={id}
                className={cn(
                    'relative flex min-h-[800px] h-[100vh] lg:h-[100vh] w-full max-m:dmin-h-[600px] bg-background]',
                    className
                )}
            >
                <div className="z-[2] w-full sticky top-0">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: .5 }}
                        className="container py-0 flex items-center justify-center h-full flex-col relative">
                        <h1 style={{ fontSize: "61px" }}>Hello</h1>
                    </motion.div>
                </div>

                <AnimatedAssetsGrid
                    images={images}
                    className={cn('absolute inset-0 h-full w-full')}
                    columnsDesktop={9}
                    rowsDesktop={4}
                    columnsMobile={3}
                    rowsMobile={4}
                />
                {backgroundDarken && <div className="absolute inset-0 bg-background/40"></div>}

            </section>
        </div>
    );
};

Hero.propTypes = {
    id: PropTypes.string,
    background: PropTypes.object,
    backgroundDarken: PropTypes.bool,
    headingType: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    mediaProps: PropTypes.object,
    theme: PropTypes.string,
};

export default Hero;
