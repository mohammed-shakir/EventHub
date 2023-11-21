import React from 'react';
import LoginForm from '../components/LoginForm.js';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
            <li><Link to="/register">No Account? Register Here!</Link></li>
        </div>
    );
};

export default Login;