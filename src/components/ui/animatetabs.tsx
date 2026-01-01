import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';


const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={`relative inline-flex items-center justify-center rounded-lg ${className}`}
        {...props}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsHighlight = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div ref={ref} className={`relative ${className}`} {...props}>
        {children}
    </div>
));
TabsHighlight.displayName = 'TabsHighlight';

// Context to track active tab
const TabsHighlightContext = React.createContext<{
    activeValue: string;
    setActiveValue: (value: string) => void;
}>({
    activeValue: '',
    setActiveValue: () => { },
});

const TabsHighlightProvider = ({ children, defaultValue, value }: { children: React.ReactNode; defaultValue?: string; value?: string }) => {
    const [activeValue, setActiveValue] = React.useState(value || defaultValue || '');

    React.useEffect(() => {
        if (value !== undefined) {
            setActiveValue(value);
        }
    }, [value]);

    return (
        <TabsHighlightContext.Provider value={{ activeValue, setActiveValue }}>
            {children}
        </TabsHighlightContext.Provider>
    );
};

const TabsHighlightItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        value: string;
        highlightColor?: string;
        shadowColor?: string;
    }
>(({ className, value, highlightColor, shadowColor, children, ...props }, ref) => {
    const { activeValue } = React.useContext(TabsHighlightContext);
    const isActive = activeValue === value;

    // Default colors (green for login)
    const defaultHighlight = 'from-[#2FE9A9] to-[#25C890]';
    const defaultShadow = 'rgba(47,233,169,0.3)';

    return (
        <div ref={ref} className={`relative ${className}`} {...props}>
            {isActive && (
                <motion.div
                    layoutId="activeTabHighlight"
                    className={`absolute inset-0 bg-gradient-to-r ${highlightColor || defaultHighlight} rounded-lg`}
                    style={{
                        zIndex: 0,
                        boxShadow: `0 0 20px ${shadowColor || defaultShadow}`
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 250,
                        damping: 30,
                        mass: 1,
                    }}
                />
            )}
            {children}
        </div>
    );
});
TabsHighlightItem.displayName = 'TabsHighlightItem';

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, value, onClick, ...props }, ref) => {
    const { setActiveValue } = React.useContext(TabsHighlightContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (value) {
            setActiveValue(value);
        }
        onClick?.(e);
    };

    return (
        <TabsPrimitive.Trigger
            ref={ref}
            value={value}
            onClick={handleClick}
            className={`relative z-10 inline-flex items-center justify-center whitespace-nowrap font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FE9A9] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-black data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white ${className}`}
            {...props}
        />
    );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContents = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
));
TabsContents.displayName = 'TabsContents';

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FE9A9] focus-visible:ring-offset-2 ${className}`}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsHighlight,
    TabsHighlightItem,
    TabsContents,
    TabsHighlightProvider,
};
