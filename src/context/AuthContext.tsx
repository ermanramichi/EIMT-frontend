import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { AppRole, AuthResponse, AuthUser, LoginPayload, RegisterPayload } from '../types';
import AuthRepository from '../api/authRepository';

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isAdministrator: boolean;
    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => void;
    hasRole: (role: AppRole) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_TOKEN = 'token';
const STORAGE_USER = 'user';

function loadUserFromStorage(): AuthUser | null {
    const raw = localStorage.getItem(STORAGE_USER);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as AuthUser;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(loadUserFromStorage);

    // React to 401s emitted from the axios interceptor.
    useEffect(() => {
        const onUnauthorized = () => setUser(null);
        window.addEventListener('auth:unauthorized', onUnauthorized);
        return () => window.removeEventListener('auth:unauthorized', onUnauthorized);
    }, []);

    const persist = (res: AuthResponse) => {
        const u: AuthUser = { username: res.username, name: res.name, role: res.role };
        localStorage.setItem(STORAGE_TOKEN, res.token);
        localStorage.setItem(STORAGE_USER, JSON.stringify(u));
        setUser(u);
    };

    const login = useCallback(async (payload: LoginPayload) => {
        const res = await AuthRepository.login(payload);
        persist(res);
    }, []);

    const register = useCallback(async (payload: RegisterPayload) => {
        const res = await AuthRepository.register(payload);
        persist(res);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_TOKEN);
        localStorage.removeItem(STORAGE_USER);
        setUser(null);
    }, []);

    const hasRole = useCallback((role: AppRole) => user?.role === role, [user]);

    const value: AuthContextValue = {
        user,
        isAuthenticated: !!user,
        isAdministrator: user?.role === 'ADMINISTRATOR',
        login,
        register,
        logout,
        hasRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
