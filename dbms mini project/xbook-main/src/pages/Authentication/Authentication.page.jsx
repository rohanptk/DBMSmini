import React, { useContext, useState } from 'react';
import './Authentication.styles.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import { ToastContainer, toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner'
const AuthenticationPage = () => {

    const [authModeIsSignIn, setAuthModeIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [authInProcess, setAuthInProcess] = useState(false);

    const switchAuthMode = () => {
        setAuthModeIsSignIn(!authModeIsSignIn);
    }

    const login = async (e) => {
        e.preventDefault();
        setAuthInProcess(true);
        await fetch("https://xbook-backend.herokuapp.com/login", {
            method: "POST",
            body: new URLSearchParams({
                email: email,
                password: password
            }),

        }).then((res) => {
            if (res.status === 404) {
                toast.error('User not found', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setAuthInProcess(false);
            } else if (res.status === 401) {
                toast.error('Email or Password is Incorrect', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setAuthInProcess(false);
            } else if (res.status === 200) {
                res.text().then(value => {
                    setCurrentUser(JSON.parse(value));
                });
                setAuthInProcess(false);
            } else {
                toast.error(res.status, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setAuthInProcess(false);
            }
        });
    }

    const register = async (e) => {
        e.preventDefault();
        setAuthInProcess(true);
        await fetch("https://xbook-backend.herokuapp.com/register", {
            method: "POST",
            body: new URLSearchParams({
                email: email,
                password: password,
                name: name
            }),

        }).then((res) => {
            if (res.status === 403) {
                toast.error("User already exists", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setAuthInProcess(false);
            } else if (res.status === 500) {
                toast.error("Unable to create the user.", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setAuthInProcess(false);
            } else if (res.status === 200) {
                toast.success("User created successfully!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setAuthInProcess(false);
                setAuthModeIsSignIn(true);
                setEmail("");
                setPassword("");
                setName("");
            }
        });
    }

    return (
        <section className='auth-page'>
            <div className="nav-bar">
                <div className="logo-container">
                    <img src={Logo} alt='Logo' />
                </div>
                <div className="nav-link-container">
                    <ul>
                        <li><Link className='nav-link' to="/home">Home</Link></li>
                    </ul>
                </div>
            </div>
            <div className='auth-form-section'>
                <form className='auth-form-container' onSubmit={authModeIsSignIn ? login : register}>
                    <h2>{authModeIsSignIn ? "Sign In" : "Sign Up"}</h2>
                    {authModeIsSignIn ? null : <input type="text" placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} required></input>}
                    <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} required></input>
                    <input autoComplete='on' type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                    <button type='submit' disabled={authInProcess ? true : false}>{authInProcess ? <Rings height="35" width="35" color='white' /> : authModeIsSignIn ? "Sign In" : "Sign Up"}</button>
                    <p>{authModeIsSignIn ? "Don't have an account yet? " : "Already have an account? "}
                        <span className='switch-span' onClick={switchAuthMode}>{authModeIsSignIn ? "Sign Up" : "Sign In"}</span></p>
                </form>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </section>
    )
}
export default AuthenticationPage;