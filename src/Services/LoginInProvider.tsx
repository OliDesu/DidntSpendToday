// @ts-ignore
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface LoginContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Monitor changes to isLoggedIn and print its value
    useEffect(() => {
        console.log('isLoggedIn changed:', isLoggedIn);
    }, [isLoggedIn]);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
