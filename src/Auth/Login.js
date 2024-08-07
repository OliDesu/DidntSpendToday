import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from './FirebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import { useCurrentUser } from '../Services/CurrentUserService.tsx'; // Corrected path
import { useLogin } from '../Services/LoginInProvider.tsx'; // Import the useLogin hook
import { User } from '../Models/User.ts';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser } = useCurrentUser();
    const { setIsLoggedIn } = useLogin(); // Get the setIsLoggedIn function

    async function fetchUserByEmail(email) {
        try {
            const userRef = collection(firestore, 'users');
            const userQuery = query(userRef, where('email', '==', email), limit(1));
            const querySnapshot = await getDocs(userQuery);
            if (querySnapshot.size === 1) {
                const user = querySnapshot.docs[0].data();
                setCurrentUser(User.convertDocumentDataToUser(user));
                setIsLoggedIn(true); // Set isLoggedIn to true
            } else {
                console.log("0 documents matched the query");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                fetchUserByEmail(email).then(() => {
                    navigate("/home");
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                // Display user-friendly message for login failure based on error code
            });
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
