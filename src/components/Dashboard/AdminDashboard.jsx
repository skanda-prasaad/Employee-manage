import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider'
import Header from '../other/Header'
import { getLocalStorage } from '../../utils/localStorage';

const AdminDashboard = () => {
  const { currentUser, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate('/login');
    } else {
      // Generate random employee data
      const randomEmployees = [
        { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Marketing', tasks: [1, 2] },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Sales', tasks: [3] },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'IT', tasks: [4, 5, 6] },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', department: 'HR', tasks: [] },
        { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', department: 'Finance', tasks: [7] },
      ];
      setEmployees(randomEmployees);
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  if (!currentUser || !currentUser.isAdmin) {
    return null;
  }

  return (
    <div className='min-h-screen w-full p-7 bg-gray-100'>
      <Header user={currentUser} onLogout={handleLogout} />
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-green-600'>Welcome to Admin Dashboard</h1>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='text-2xl font-semibold mb-4 text-blue-500'>Employee List</h2>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider'>Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider'>Email</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider'>Department</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider'>Tasks</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td className='px-6 py-4 whitespace-nowrap text-blue-600'>{employee.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-blue-600'>{employee.email}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-blue-600'>{employee.department}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-blue-600'>{employee.tasks.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
