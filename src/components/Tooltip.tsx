import React from 'react';
import {
    Tooltip as TooltipRoot,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/animatetooltip';

interface TooltipProps {
    children: React.ReactNode;
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    hoverDelay?: number;
}

const Tooltip = ({
    children,
    text,
    position = 'top',
    hoverDelay = 200,
}: TooltipProps) => {
    return (
        <TooltipProvider delayDuration={hoverDelay}>
            <TooltipRoot>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent
                    side={position}
                    className="bg-[#1E1F22] text-white px-3 py-1.5 rounded-md text-xs border border-white/10 shadow-xl z-50"
                >
                    <p className="font-semibold">{text}</p>
                </TooltipContent>
            </TooltipRoot>
        </TooltipProvider>
    );
};

export default Tooltip;
