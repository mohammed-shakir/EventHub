import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/events" element={isAuthenticated ? <Events /> : <Navigate to="/login" />} />
          <Route path="/events/:eventId" element={isAuthenticated ? <EventDetails /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;