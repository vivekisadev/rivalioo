import React from 'react';
import { useLocation } from 'react-router-dom';
import { isRouteLocked } from '../constants/lockedRoutes';
import ComingSoon from '../pages/ComingSoon';

interface FeatureGuardProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

const FeatureGuard = ({ children, title = "COMING SOON", subtitle }: FeatureGuardProps) => {
    const location = useLocation();

    // Check if the current route is in the locked list
    if (isRouteLocked(location.pathname)) {
        return (
            <ComingSoon title={title} subtitle={subtitle}>
                {children}
            </ComingSoon>
        );
    }

    return <>{children}</>;
};

export default FeatureGuard;
