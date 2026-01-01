import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Arrow>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow> & {
        withTransition?: boolean;
    }
>(({ className, withTransition, ...props }, ref) => (
    <TooltipPrimitive.Arrow
        ref={ref}
        className={className}
        {...props}
    />
));
TooltipArrow.displayName = 'TooltipArrow';

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={className}
        {...props}
    >
        <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
            }}
        >
            {children}
        </motion.div>
    </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipArrow };
