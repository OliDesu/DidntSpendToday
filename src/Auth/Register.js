// Signup.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseConfig';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            navigate("/login");
        } catch (error) {
            console.error(error.code, error.message);
        }
    };

    return (
        <main>
            <section>
                <div>
                    <h1>FocusApp</h1>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email-address">Email address</label>
                            <input
                                type="email"
                                id="email-address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email address"
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                        </div>

                        <button type="submit">Sign up</button>
                    </form>

                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login">Sign in</NavLink>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Register;
