import React from 'react';
import RegistrationForm from '../components/RegistrationForm.js';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <RegistrationForm />
            <li><Link to="/login">Already Have An Account? Login Here!</Link></li>
        </div>
    );
};

export default Register;