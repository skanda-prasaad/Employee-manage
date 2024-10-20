// App.jsx
import React, { useContext, useState, useEffect } from 'react';
import Login from './components/Auth/Loigin';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';
import { getLocalStorage } from './utils/localStorage';

const App = () => {
  const [user, setUser] = useState(null);
  const { employees } = useContext(AuthContext); // Destructure employees from context

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) setUser(storedUser); 
  }, []);

  const handleLogin = (email, password) => {
    const { admin } = getLocalStorage();

    if (admin.some((a) => a.email === email && a.password === password)) {
      console.log('Admin Login');
      setUser('admin');
    } else if (
      employees.some((e) => e.email === email && e.password === password)
    ) {
      console.log('Employee Login');
      setUser('employee');
    } else {
      alert('Invalid Credentials'); // Show alert for invalid credentials
    }
  };

  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === 'admin' ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard />
      )}
    </>
  );
};

export default App;
