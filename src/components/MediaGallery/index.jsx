"use client";

import PropTypes from 'prop-types';
import Media from '@/components/Media';

/**
 * A generic content section that displays HTML content in a container.
 */

export const MediaGallery = ({
    id = 'mediaGallery',
    mediaProps = [{}],
    display = 'gallery',
    className = '',
}) => {

    // Define default media items to use as fallback
    const defaultMediaItems = [
        {
            file: '/placeholder_1.jpg',
            parallax: true,
            autoplay: false,
            controls: false,
        },
        {
            file: '/placeholder_2.jpg',
            parallax: true,
            autoplay: false,
            controls: false,
        },
        {
            file: '/placeholder_3.jpg',
            parallax: true,
            autoplay: false,
            controls: false,
        }
    ];

    // Process the mediaProps to handle both direct array and nested structure
    // Use default media items if no media is provided from Builder.io
    const processedMediaProps = defaultMediaItems;

    // Render different layouts based on display mode
    const renderGalleryLayout = () => (
        <div className="flex flex-col gap-4">
            {/* First image on top, full width */}
            {processedMediaProps?.length > 0 && (
                <div className="w-full aspect-[168/95] relative overflow-hidden rounded-md max-h-[760px]">
                    <Media
                        file={processedMediaProps[0]?.file ? mediaProps[0]?.file : '/placeholder/architecture/13.png'}
                        autoplay={processedMediaProps[0]?.autoplay ? mediaProps[0]?.autoplay : false}
                        controls={processedMediaProps[0]?.controls ? mediaProps[0]?.controls : false}
                        className="absolute inset-0 h-full w-full object-cover"
                        {...processedMediaProps[0]}
                    />
                </div>
            )}

            {/* Remaining images in a row of 2 */}
            {processedMediaProps?.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {processedMediaProps.slice(1).map((item, index) => (
                        <div key={index} className="aspect-[661/371] relative overflow-hidden rounded-md">
                            <Media
                                file={item?.file}
                                autoplay={item?.autoplay || false}
                                controls={item?.controls || false}
                                className="w-full h-full object-cover"
                                {...item}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // List layout with rows of 3
    const renderListLayout = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {processedMediaProps.map((item, index) => (
                <div key={index} className="aspect-[433/568] relative overflow-hidden rounded-md">
                    <Media
                        file={item.file}
                        autoplay={item.autoplay || false}
                        controls={item.controls || false}
                        {...item}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <section id={id} className={'container relative bg-background py-8'}>
                {display === 'gallery' ? renderGalleryLayout() : renderListLayout()}
            </section>
        </div>
    );
};

MediaGallery.propTypes = {
    id: PropTypes.string,
    media: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            autoplay: PropTypes.bool,
            controls: PropTypes.bool
        })
    ),
    theme: PropTypes.string,
    className: PropTypes.string
};

export default MediaGallery;