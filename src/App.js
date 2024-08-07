import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './Auth/FirebaseConfig';
import Login from './Auth/Login';
import Register from './Auth/Register';
import GreenSquares from './GreenSquares';
import { CurrentUserProvider } from './Services/CurrentUserService.tsx';
import AuthProvider from './Auth/AuthProvider';
import Header from "./Shared/Header";
import { LoginProvider } from './Services/LoginInProvider.tsx';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <LoginProvider>

            <CurrentUserProvider>
                <AuthProvider>
                    <Header />
                    <Routes>
                        <Route path="/home" element={<GreenSquares />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </AuthProvider>
            </CurrentUserProvider>
                </LoginProvider>

        </Router>
    );
}

export default App;
