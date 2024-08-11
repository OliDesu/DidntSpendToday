// @ts-ignore
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Auth/FirebaseConfig'; // Import your Firebase auth configuration

interface LoginContextProps {
    isLoggedIn: boolean;
    loading: boolean;
    userLoaded: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setUserLoaded(true);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <LoginContext.Provider value={{ isLoggedIn, loading, userLoaded, setIsLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = (): LoginContextProps => {
    const context = useContext(LoginContext);
    if (context === undefined) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};
