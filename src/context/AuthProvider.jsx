// context/AuthProvider.jsx
import React, { createContext, useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  // Initialize localStorage with default data if not present
  useEffect(() => {
    const { employees: storedEmployees } = getLocalStorage();
    if (!storedEmployees || storedEmployees.length === 0) {
      setLocalStorage(); // Initialize default data
    }
    setEmployees(storedEmployees || []);
  }, []);

  const addEmployee = (newEmployee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <AuthContext.Provider value={{ employees, addEmployee }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
