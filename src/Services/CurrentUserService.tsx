// @ts-ignore
import React, { createContext, useState, useContext, ReactNode } from 'react';
import {User} from '../Models/User';

interface CurrentUserContextProps {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

const CurrentUserContext = createContext<CurrentUserContextProps | undefined>(undefined);
const isUserLoggedIn = React.createContext(false);
isUserLoggedIn.displayName = 'isUserLoggedIn';

export const CurrentUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

export const useCurrentUser = (): CurrentUserContextProps => {
    const context = useContext(CurrentUserContext);
    if (context === undefined) {
        throw new Error('useCurrentUser must be used within a CurrentUserProvider');
    }
    return context;
};
