// Signup.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { firestore } from './FirebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Prepare user data for Firestore
            const userStorage = {
                email: email,
                name: name,
                progress: []
            };

            // Store user data in Firestore
            const userDoc = doc(collection(firestore, 'users'), email);
            await setDoc(userDoc, userStorage);
            // Log the user object
            console.log(user);

            // Navigate to login page
            navigate("/login");
        } catch (error) {
            console.error(error.code, error.message);
        }
    };

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div className="title">Sign in</div>
            </div>
            <br/>
            <div className={'inputContainer'}>
                <input
                    name="name"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name here"
                    className={'inputBox'}

                />
            </div>
            <br/>
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
            <br/>
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
            <br/>
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onSubmit}
                       value={'Sign up'}/>
            </div>

            <span className={'text-redirect'}>Already have an account?</span>
            <NavLink to="/login">Sign in</NavLink>
        </div>
    );
};

export default Register;
