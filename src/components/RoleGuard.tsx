import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppRole } from '../types';

interface RoleGuardProps {
    roles: AppRole[];
    children: ReactNode;
    fallback?: ReactNode;
}

/**
 * Renders {@code children} only when the current user has one of the listed roles.
 * Useful for hiding action buttons (Add/Edit/Delete) from non-administrators
 * without removing the surrounding layout.
 */
const RoleGuard = ({ roles, children, fallback = null }: RoleGuardProps) => {
    const { user } = useAuth();
    if (!user || !roles.includes(user.role)) {
        return <>{fallback}</>;
    }
    return <>{children}</>;
};

export default RoleGuard;
