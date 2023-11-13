import React, { useState } from 'react';
import { registerUser } from '../api_calls/user';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_role , setRole] = useState('Regular');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { email, password, user_role };
      const response = await registerUser(userData);
      console.log('Registration successful', response);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <select value={user_role} onChange={(e) => setRole(e.target.value)}>
        <option value="Regular">Regular</option>
        <option value="Organizer">Organizer</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;