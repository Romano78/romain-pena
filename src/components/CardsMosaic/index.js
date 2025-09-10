// CardsMosaic.jsx
import PropTypes from 'prop-types';
import ProjectCard from '@/components/ProjectCard';
import { cn } from '@/lib/utils';

/**
 * CardsMosaic Section Component
 * Displays a mosaic layout of project cards with an optional title
 * @param {Object} props - Component props
 * @param {Array} [props.cards=defaultCards] - Array of card data objects
 * @param {string} [props.title] - Optional section title
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Optional ID for anchor linking
 * @param {string} [props.theme] - Optional theme override for this section (light, dark, modern)
 * @returns {React.JSX.Element} Rendered CardsMosaic section
 */
const CardsMosaic = ({
    cards = defaultCards,
    title,
    className = '',
    id = 'cards-mosaic',
}) => {
    return (
        <div >
            <div className="bg-background">
                <section id={id} className={cn('container', className)}>
                    {title && <h2 className="h2 mb-12 max-lg:mb-8">{title}</h2>}
                    <ul className="max-lg:flex max-lg:flex-col max-lg:gap-8 lg:space-y-12">
                        {cards.length > 1 && (
                            <li className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                                <ProjectCard {...cards[0]} />
                                <ProjectCard {...cards[1]} className="md:mt-[336px]" />
                            </li>
                        )}

                        {cards.length > 2 && (
                            <li className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                                <ProjectCard {...cards[2]} className="md:w-[60vw]" />
                            </li>
                        )}

                        {cards.length > 4 && (
                            <li className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                                <ProjectCard {...cards[3]} className="md:mt-[336px]" />
                                <ProjectCard {...cards[4]} />
                            </li>
                        )}
                    </ul>
                </section>
            </div>
        </div>
    );
};

const defaultCards = [
    {
        name: 'The Parker',
        neighbourhood: 'Downtown',
        location: '123 Main Street',
        image: '/placeholder_1.jpg',
        link: '/projects/the-parker',
        city: 'Toronto',
    },
    {
        name: 'The Madison',
        neighbourhood: 'Midtown',
        location: '456 Park Avenue',
        image: '/placeholder_2.jpg',
        link: '/projects/the-madison',
        city: 'Toronto',
    },
    {
        name: 'The Victoria',
        neighbourhood: 'Waterfront',
        location: '789 Lake Shore',
        image: '/placeholder_3.jpg',
        link: '/projects/the-victoria',
        city: 'Toronto',
    },
    {
        name: 'The Wellington',
        neighbourhood: 'West End',
        location: '321 Queen Street',
        image: '/placeholder_4.jpg',
        link: '/projects/the-wellington',
        city: 'Toronto',
    },
    {
        name: 'The Cambridge',
        neighbourhood: 'East End',
        location: '654 King Street',
        image: '/placeholder_5.jpg',
        link: '/projects/the-cambridge',
        city: 'Toronto',
    },
];

CardsMosaic.propTypes = {
    /**
     * Array of card objects containing project information
     */
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            neighbourhood: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
        })
    ),
    /**
     * Optional section title
     */
    title: PropTypes.string,
    /**
     * Additional CSS classes
     */
    className: PropTypes.string,
    /**
     * Optional ID for anchor linking
     */
    id: PropTypes.string,
    /**
     * Optional theme override for this section (light, dark, modern)
     */
    theme: PropTypes.string,
};

export default CardsMosaic;
