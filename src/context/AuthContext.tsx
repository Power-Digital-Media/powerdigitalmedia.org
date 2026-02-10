"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lazy load Firebase only when AuthProvider mounts
        let unsubscribe: (() => void) | undefined;

        const initAuth = async () => {
            try {
                const { auth } = await import('@/lib/firebase');
                const { onAuthStateChanged } = await import('firebase/auth');

                unsubscribe = onAuthStateChanged(auth, (user) => {
                    setUser(user);
                    setLoading(false);
                });
            } catch (error) {
                console.error('Failed to initialize auth:', error);
                setLoading(false);
            }
        };

        initAuth();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
