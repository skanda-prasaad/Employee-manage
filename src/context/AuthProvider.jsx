// context/AuthProvider.jsx
import React, { createContext, useState, useCallback } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = useCallback((email, password) => {
    // Admin login check
    if (email === 'admin@example.com' && password === '123') {
      const adminUser = {
        id: 'admin',
        email,
        isAdmin: true,
        name: 'Admin'
      };
      setCurrentUser(adminUser);
      localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
      return 'admin';
    }

    // Employee login check
    const employees = [
      { id: 1, email: 'john@example.com', password: '123', name: 'Employee 1' },
      { id: 2, email: 'jane@example.com', password: '123', name: 'Employee 2' },
      { id: 3, email: 'bob@example.com', password: '123', name: 'Employee 3' },
      { id: 4, email: 'alice@example.com', password: '123', name: 'Employee 4' },
      { id: 5, email: 'charlie@example.com', password: '123', name: 'Employee 5' },
    ];

    const employee = employees.find(emp => emp.email === email && emp.password === password);
    
    if (employee) {
      const employeeUser = {
        ...employee,
        isAdmin: false
      };
      setCurrentUser(employeeUser);
      localStorage.setItem('loggedInUser', JSON.stringify(employeeUser));
      return 'employee';
    }

    return false;
  }, []);

  const logoutUser = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('loggedInUser');
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
