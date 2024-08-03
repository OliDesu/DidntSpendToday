import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from './Auth/FirebaseConfig';

const Navbar = ({ user }) => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {user ? (
                    <>
                        <li><button onClick={() => auth.signOut()}>Log Off</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;