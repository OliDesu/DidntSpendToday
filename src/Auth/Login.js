import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { useNavigate } from 'react-router-dom'
import './Login.css';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/home")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }

    return (


        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div className="title">Login</div>
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
                <input className={'inputButton'} type="button"                                     onClick={onLogin}
                       value={'Log in'}/>
            </div>
        </div>



    )
}

export default Login