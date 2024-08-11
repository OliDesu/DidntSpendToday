import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from './FirebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import { useCurrentUser } from '../Services/CurrentUserService.tsx';
import { useLogin } from '../Services/LoginInProvider.tsx';
import { User } from '../Models/User.ts';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import {useFetchUserByEmail} from "./UserData";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser } = useCurrentUser();
    const { setIsLoggedIn } = useLogin();
    const { fetchUserByEmail } = useFetchUserByEmail();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, fetch user data from Firestore
                await fetchUserByEmail(user.email);
                navigate("/home");
            } else {
                // User is signed out, reset the state
                setIsLoggedIn(false);
                setCurrentUser(new User('','',[]));
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate, setIsLoggedIn, setCurrentUser]);


    const onLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            await fetchUserByEmail(email);
            navigate("/home");
        } catch (error) {
            console.error(error.code, error.message);
            // Display user-friendly message for login failure based on error code
        }
    };

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div className="title">Login</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    id="email-address"
                    name="email"
                    type="email"
                    value={email}
                    required
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onLogin} value={'Log in'} />
            </div>
            <span className={'text-redirect'}>No account yet?</span>
            <NavLink to="/register">Sign up</NavLink>
        </div>
    );
}

export default Login;
