// ProjectCard.jsx

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';
import Badge from '@/elements/Badge';

const ProjectCard = ({
    name,
    neighborhood,
    location,
    className = '',
    href = '/',
    image,
    city,
    tags = []
}) => {

    // Handle tags that could be strings or objects with a tag property
    const normalizedTags = tags?.map(tag => typeof tag === 'object' && tag?.tag ? tag.tag : tag);
    const isComingSoon = normalizedTags?.includes('coming-soon');

    const renderComingSoonBadge = () => {
        return (
            <div className="bg-secondary aspect-[4/3] w-full relative overflow-hidden rounded-[--radius]">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
                    <Badge className="bg-background/40 text-white uppercase rounded-md" >
                        Coming Soon
                    </Badge>
                    <span className="h2 uppercase font-bold text-secondary-foreground">{name}</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Link className={cn('item', isComingSoon ? 'cursor-not-allowed' : '')} href={isComingSoon ? '#' : href}>
                <figure
                    className={cn(
                        'group group/item overflow-hidden rounded-[--radius] transition duration-500',
                        className
                    )}
                >
                    <div className="relative overflow-hidden">
                        {
                            isComingSoon ? renderComingSoonBadge()
                                : (
                                    <div className="aspect-[4/3] bg-primary w-full relative overflow-hidden rounded-[--radius]">
                                        {image && (
                                            <Image
                                                data-mouse-title={name}
                                                src={image}
                                                width={664 * 2}
                                                height={500 * 2}
                                                className="absolute inset-0 top-0 left-0 w-full h-full duration-500 ease-in-out object-cover md:group-hover/item:scale-110"
                                                alt={`${name}`}
                                            />
                                        )}
                                        {tags?.length && (
                                            <div className="absolute top-4 right-4">
                                                <div className="flex items-center gap-2 justify-end h-full">
                                                    {tags.map((tag, index) => (
                                                        <Badge
                                                            key={index}
                                                            className="bg-background/40 text-white uppercase rounded-[6px]"
                                                        >
                                                            {typeof tag === 'object' && tag?.tag ? tag.tag : tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                        {location && (
                            <div>
                                <p className="bg-background text-foreground hidden [text-orientation:mixed] [writing-mode:vertical-lr] md:absolute md:top-0 md:right-0 md:block md:h-full md:translate-x-[100%] md:px-2 md:py-4 md:transition md:duration-500 md:group-hover:translate-x-[-0px]">
                                    {location}
                                </p>
                            </div>
                        )}
                    </div>
                    <figcaption className="pb-6 pt-4">
                        {name && <h3 className="text-[18px] text-foreground mb-1 font-bold">{name}</h3>}
                        {neighborhood && (
                            <p>
                                {neighborhood} • {city}
                            </p>
                        )}
                    </figcaption>
                </figure>
            </Link>
        </div>
    );
};

ProjectCard.propTypes = {
    name: PropTypes.string,
    neighborhood: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
    city: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
};

export default ProjectCard;
