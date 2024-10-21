// App.jsx
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';
import Login from './components/Auth/Loigin';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';

function AppContent() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate('/employee-dashboard');
      }
    } else {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
