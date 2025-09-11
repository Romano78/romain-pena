

import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';
import AnimatedAssetsGrid from '@/elements/AnimatedAssetsGrid';
import TextRevealBlur from '@/elements/TextRevealBlur';

const tempImages = Array.from({ length: 36 }, (_, i) => `/placeholder_${(i + 1) % 15}.jpg`);

const Hero = ({
    id = "hero",
    gridImages = tempImages,
    className = ""
}) => {

    const images = gridImages?.[0]?.file ? gridImages.map(image => image.file) : tempImages

    return (
        <div>
            <section
                id={id}
                className={cn(
                    'relative flex min-h-[800px] h-[150vh] lg:h-[220vh] w-full max-md:min-h-[600px] bg-background]',
                    className
                )}
            >
                <div className="z-[2] w-full sticky top-0">
                    <div className="container py-0 flex items-center justify-center h-full flex-col relative">
                        <TextRevealBlur
                            tag={"h1"}
                            textClassName="h2 text-center max-w-[836px] text-balance leading-none"
                            textCenter={true}
                            body={"Romain"}
                            sticky={true}
                        />
                    </div>
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
