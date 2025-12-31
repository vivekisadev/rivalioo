export const LOCKED_ROUTES = [
    '/shop',
    '/profile',
    '/settings',
    '/tournaments',
    '/leaderboard',
    '/community',
    '/streams',
    '/join',
    '/about',
    '/live',
    '/coming-soon'
];

export const isRouteLocked = (pathname: string): boolean => {
    return LOCKED_ROUTES.some(route => pathname.startsWith(route));
};
