import * as React from 'react';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

const badgeVariants = cn(
    'focus:ring-ring inline-flex items-center rounded-full text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent',
                outline:
                    'text-foreground border-input hover:bg-accent hover:text-accent-foreground border',
                ghost:
                    'bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'px-4 py-1',
                sm: 'px-2.5 py-0.5 text-xs',
                lg: 'px-4 py-1.5',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

function Badge({ className, variant, size, ...props }) {
    return (
        <div
            className={cn(badgeVariants({ variant, size }), className)}
            {...props}
        />
    );
}

Badge.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf([
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
    ]),
    size: PropTypes.oneOf(['default', 'sm', 'lg']),
};

export { badgeVariants };

export default Badge;
