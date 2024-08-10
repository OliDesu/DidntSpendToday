import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from './FirebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import { useCurrentUser } from '../Services/CurrentUserService.tsx';
import { useLogin } from '../Services/LoginInProvider.tsx';
import { User } from '../Models/User.ts';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser } = useCurrentUser();
    const { setIsLoggedIn } = useLogin();

    async function fetchUserByEmail(email) {
        try {
            const userRef = collection(firestore, 'users');
            const userQuery = query(userRef, where('email', '==', email), limit(1));
            const querySnapshot = await getDocs(userQuery);
            if (querySnapshot.size === 1) {
                const user = querySnapshot.docs[0].data();
                setCurrentUser(User.convertDocumentDataToUser(user));
                setIsLoggedIn(true);

            } else {
                console.log("0 documents matched the query");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

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
