import React from 'react';
import LoginForm from '../components/LoginForm.js';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from '../components/GoogleLoginButton.js';

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLoginButton />
            </GoogleOAuthProvider>

            <li><Link to="/register">No Account? Register Here!</Link></li>
        </div>
    );
};

export default Login;