import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import GreenSquares from './GreenSquares';
import { CurrentUserProvider } from './Services/CurrentUserService.tsx';
import AuthProvider from './Auth/AuthProvider';
import Header from "./Shared/Header";
import { LoginProvider, useLogin } from './Services/LoginInProvider.tsx';
import Spinner from 'react-bootstrap/Spinner';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loading, userLoaded } = useLogin();

    if (loading || !userLoaded) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
        <Router>
            <LoginProvider>
                <CurrentUserProvider>
                    <AuthProvider>
                        <Header />
                        <Routes>
                            <Route path="/home" element={
                                <ProtectedRoute>
                                    <GreenSquares />
                                </ProtectedRoute>
                            } />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </Routes>
                    </AuthProvider>
                </CurrentUserProvider>
            </LoginProvider>
        </Router>
    );
}

export default App;
