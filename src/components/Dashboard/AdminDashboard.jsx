import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider'
import Header from '../other/Header'
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';

const AdminDashboard = () => {
  const { currentUser, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    deadline: '',
    assignedTo: ''
  });

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate('/login');
    } else {
      const storedEmployees = getLocalStorage().employees || [];
      setEmployees(storedEmployees.length > 0 ? storedEmployees : [
        { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Marketing', tasks: [] },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Sales', tasks: [] },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'IT', tasks: [] },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', department: 'HR', tasks: [] },
        { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', department: 'Finance', tasks: [] },
      ]);
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleTaskFormChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      ...taskForm,
      newTask: true
    };

    const updatedEmployees = employees.map(emp => {
      if (emp.id === parseInt(taskForm.assignedTo)) {
        return { ...emp, tasks: [...emp.tasks, newTask] };
      }
      return emp;
    });

    setEmployees(updatedEmployees);
    setLocalStorage({ employees: updatedEmployees });
    setTaskForm({ title: '', description: '', deadline: '', assignedTo: '' });
    alert('Task assigned successfully!');
  };

  if (!currentUser || !currentUser.isAdmin) {
    return null;
  }

  return (
    <div className='min-h-screen w-full p-7 bg-gray-100'>
      <Header user={currentUser} onLogout={handleLogout} />
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-green-600'>Welcome to Admin Dashboard</h1>
        
        {/* Task Assignment Form */}
        <div className='bg-white p-6 rounded-lg shadow mb-6'>
          <h2 className='text-2xl font-semibold mb-4 text-blue-500'>Assign New Task</h2>
          <form onSubmit={handleTaskSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Task Title</label>
              <input
                type='text'
                name='title'
                value={taskForm.title}
                onChange={handleTaskFormChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Description</label>
              <textarea
                name='description'
                value={taskForm.description}
                onChange={handleTaskFormChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
                required
              ></textarea>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Deadline</label>
              <input
                type='date'
                name='deadline'
                value={taskForm.deadline}
                onChange={handleTaskFormChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Assign To</label>
              <select
                name='assignedTo'
                value={taskForm.assignedTo}
                onChange={handleTaskFormChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
                required
              >
                <option value=''>Select an employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Assign Task
            </button>
          </form>
        </div>

        {/* Employee List */}
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
