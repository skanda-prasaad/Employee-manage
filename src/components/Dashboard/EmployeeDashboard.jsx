import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider'
import Header from "../other/Header"
import { getLocalStorage } from '../../utils/localStorage';

const EmployeeDashboard = () => {
  const { currentUser, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      // Simulating task data (replace this with actual data from your storage)
      const mockTasks = [
        { id: 1, title: 'Complete project report', status: 'In Progress', dueDate: '2023-05-15' },
        { id: 2, title: 'Review client proposal', status: 'Pending', dueDate: '2023-05-20' },
        { id: 3, title: 'Prepare presentation', status: 'Completed', dueDate: '2023-05-10' },
      ];
      setTasks(mockTasks);
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className='min-h-screen w-full p-7 bg-gray-100'>
      <Header user={currentUser} onLogout={handleLogout} />
      <div className='max-w-4xl mx-auto mt-8'>
        <h1 className='text-3xl font-bold mb-6 text-blue-600'>Employee Dashboard</h1>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='text-2xl font-semibold mb-4 text-blue-500'>Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className='text-gray-600'>No tasks assigned yet.</p>
          ) : (
            <div className='grid gap-4'>
              {tasks.map(task => (
                <div key={task.id} className='border p-4 rounded-md hover:bg-gray-50 transition-colors'>
                  <h3 className='text-lg font-semibold text-blue-600'>{task.title}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard;
