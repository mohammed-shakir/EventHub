import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext, UserProvider } from './provider/UserProvider';
import { EventProvider } from './provider/EventProvider';
import { CategoryProvider } from './provider/CategoryProvider';
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
            <CategoryProvider>
                <EventProvider>
                    <Router>
                        <RoutesWithAccessControl />
                    </Router>
                </EventProvider>
            </CategoryProvider>
        </UserProvider>
    );
}

const RoutesWithAccessControl = () => {
    const { userProfile, isLoading } = useContext(UserContext);

    const PrivateRoute = ({ children }) => {
        const isAuthenticated = !!userProfile;
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    const AdminRoute = ({ children }) => {
        const isAuthenticated = !!userProfile && userProfile.user_role === 'Admin';
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return isAuthenticated ? children : <Navigate to="/" />;
    };

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
            <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
            <Route path="/events/:eventId" element={<PrivateRoute><EventDetails /></PrivateRoute>} />
        </Routes>
    );
};

export default App;
