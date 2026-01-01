export const LOCKED_ROUTES: string[] = ['/community', '/about', '/join'];

export const isRouteLocked = (pathname: string): boolean => {
    return LOCKED_ROUTES.some(route => pathname.startsWith(route));
};
