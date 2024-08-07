// @ts-ignore
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoginContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
