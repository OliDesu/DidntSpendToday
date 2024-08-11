// @ts-ignore
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// @ts-ignore
import { User } from '../Models/User.ts';

interface CurrentUserContextProps {
    currentUser: User;
    setCurrentUser: (user: User) => void;
}

const CurrentUserContext = createContext<CurrentUserContextProps | undefined>(undefined);

export const CurrentUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User>(new User('', '', [new Date()]));

    useEffect(() => {
        console.log('User charged:', currentUser);
    }, [currentUser]);

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
