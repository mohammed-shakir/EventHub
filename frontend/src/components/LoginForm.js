import React, { useState } from 'react';
import { loginUser } from '../api_calls/user';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { email, password };
      const response = await loginUser(userData);
      // Store JWT in local storage
      localStorage.setItem('token', response.token);
      console.log('Login successful', response);
      window.location.href = '/';
    } catch (error) {
      console.error('Error during Login', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;