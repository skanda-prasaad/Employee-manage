// context/AuthProvider.jsx
import React, { createContext, useState, useCallback } from 'react';
import { getLocalStorage } from '../utils/localStorage';

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = useCallback((email, password) => {
    const { employees } = getLocalStorage();
    
    // Check for admin credentials
    if (email === 'admin@example.com' && password === '123') {
      const loggedInAdmin = { 
        id: 101, 
        email: 'admin@example.com', 
        isAdmin: true 
      };
      setCurrentUser(loggedInAdmin);
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInAdmin));
      return 'admin';
    }

    const employeeUser = employees.find(emp => emp.email === email && emp.password === password);
    if (employeeUser) {
      const loggedInEmployee = { ...employeeUser, isAdmin: false };
      setCurrentUser(loggedInEmployee);
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInEmployee));
      return 'employee';
    }

    return false;
  }, []);

  const logoutUser = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('loggedInUser');
  }, []);

  const value = {
    currentUser,
    loginUser,
    logoutUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
