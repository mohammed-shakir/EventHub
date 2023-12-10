import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext, UserProvider } from './provider/UserProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import UserProfile from './pages/UserProfile';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import './App.css';

function App() {
    return (
        <UserProvider>
            <Router>
                <RoutesWithAccessControl />
            </Router>
        </UserProvider>
    );
}

const RoutesWithAccessControl = () => {
    const { userProfile, isLoading } = useContext(UserContext);
    const isAuthenticated = localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}><Home /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute isAuthenticated={isAuthenticated} userProfile={userProfile} isLoading={isLoading}><Admin /></AdminRoute>} />
            <Route path="/profile" element={<PrivateRoute isAuthenticated={isAuthenticated}><UserProfile /></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute isAuthenticated={isAuthenticated}><Events /></PrivateRoute>} />
            <Route path="/events/:eventId" element={<PrivateRoute isAuthenticated={isAuthenticated}><EventDetails /></PrivateRoute>} />
        </Routes>
    );
};

const PrivateRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children, isAuthenticated, userProfile, isLoading }) => {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated && userProfile && userProfile.user_role === 'Admin'
        ? children
        : <Navigate to="/" />;
};

export default App;
