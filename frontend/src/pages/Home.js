import React from 'react';
import Navbar from '../components/Navbar.js';
import RegistrationForm from '../components/RegistrationForm.js';

const Home = () => {
    return (
        <div>
            <Navbar />
            <RegistrationForm />
            <h1>Home</h1>
        </div>
    );
};

export default Home;