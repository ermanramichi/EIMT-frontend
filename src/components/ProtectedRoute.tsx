import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppRole } from '../types';

interface ProtectedRouteProps {
    /**
     * If provided, the user must have ONE of these roles to access the route.
     * If omitted, any authenticated user is allowed in.
     */
    roles?: AppRole[];
    children: ReactNode;
}

/**
 * Gates a route by authentication and (optionally) role.
 *
 * - Unauthenticated → redirect to /login, remembering where they came from.
 * - Wrong role → redirect home (avoids a redirect loop with /login).
 */
const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (roles && roles.length > 0 && (!user || !roles.includes(user.role))) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
