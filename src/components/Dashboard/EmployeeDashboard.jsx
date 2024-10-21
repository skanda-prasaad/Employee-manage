import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider'
import Header from "../other/Header"
import { getLocalStorage } from '../../utils/localStorage';

const EmployeeDashboard = () => {
  const { currentUser, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({
    newTasks: [],
    acceptedTasks: [],
    completedTasks: [],
    failedTasks: []
  });
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      // Fetch tasks from localStorage or API
      const { employees } = getLocalStorage();
      const userTasks = employees.find(emp => emp.id === currentUser.id)?.tasks || [];
      
      setTasks({
        newTasks: userTasks.filter(task => task.newTask),
        acceptedTasks: userTasks.filter(task => task.active),
        completedTasks: userTasks.filter(task => task.completed),
        failedTasks: userTasks.filter(task => task.failed)
      });
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleAcceptTask = (task) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      newTasks: prevTasks.newTasks.filter(t => t.id !== task.id),
      acceptedTasks: [...prevTasks.acceptedTasks, { ...task, active: true, newTask: false }]
    }));
    updateLocalStorage(task.id, { active: true, newTask: false });
  };

  const handleRejectTask = (task) => {
    setSelectedTask(task);
    setShowRejectModal(true);
  };

  const confirmRejectTask = () => {
    if (!rejectReason.trim()) {
      alert('Reason for rejection is required.');
      return;
    }
    setTasks(prevTasks => ({
      ...prevTasks,
      newTasks: prevTasks.newTasks.filter(t => t.id !== selectedTask.id)
    }));
    removeTaskFromLocalStorage(selectedTask.id);
    setShowRejectModal(false);
    setRejectReason('');
  };

  const handleCompleteTask = (task) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      acceptedTasks: prevTasks.acceptedTasks.filter(t => t.id !== task.id),
      completedTasks: [...prevTasks.completedTasks, { ...task, completed: true, active: false }]
    }));
    updateLocalStorage(task.id, { completed: true, active: false });
  };

  const handleFailTask = (task) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      acceptedTasks: prevTasks.acceptedTasks.filter(t => t.id !== task.id),
      failedTasks: [...prevTasks.failedTasks, { ...task, failed: true, active: false }]
    }));
    updateLocalStorage(task.id, { failed: true, active: false });
  };

  const updateLocalStorage = (taskId, updates) => {
    const { employees } = getLocalStorage();
    const updatedEmployees = employees.map(emp => {
      if (emp.id === currentUser.id) {
        emp.tasks = emp.tasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        );
      }
      return emp;
    });
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const removeTaskFromLocalStorage = (taskId) => {
    const { employees } = getLocalStorage();
    const updatedEmployees = employees.map(emp => {
      if (emp.id === currentUser.id) {
        emp.tasks = emp.tasks.filter(task => task.id !== taskId);
      }
      return emp;
    });
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const TaskCard = ({ task, actions, bgColor }) => (
    <div key={task.id} className={`${bgColor} rounded-md p-4`}>
      <h3 className='text-sm font-medium text-black'>{task.title}</h3>
      <p className='mt-1 text-sm text-black'>{task.description}</p>
      <p className='mt-2 text-xs text-gray-700'>Deadline: {formatDate(task.deadline)}</p>
      <div className='mt-4 flex justify-end space-x-2'>
        {actions}
      </div>
    </div>
  );

  if (!currentUser) {
    return null;
  }

  return (
    <div className='min-h-screen w-full bg-gray-100'>
      <Header user={currentUser} onLogout={handleLogout} />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-extrabold text-black mb-8'>Employee Dashboard</h1>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* New Tasks */}
          <div className='bg-white overflow-hidden shadow-sm rounded-lg'>
            <div className='px-4 py-5 sm:p-6'>
              <h2 className='text-lg font-medium text-black mb-4'>New Tasks</h2>
              {tasks.newTasks.length === 0 ? (
                <p className='text-black text-sm'>No new tasks assigned.</p>
              ) : (
                <div className='space-y-4'>
                  {tasks.newTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      bgColor="bg-blue-200"
                      actions={
                        <>
                          <button 
                            onClick={() => handleAcceptTask(task)}
                            className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleRejectTask(task)}
                            className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          >
                            Reject
                          </button>
                        </>
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Accepted Tasks */}
          <div className='bg-white overflow-hidden shadow-sm rounded-lg'>
            <div className='px-4 py-5 sm:p-6'>
              <h2 className='text-lg font-medium text-black mb-4'>Accepted Tasks</h2>
              {tasks.acceptedTasks.length === 0 ? (
                <p className='text-black text-sm'>No accepted tasks.</p>
              ) : (
                <div className='space-y-4'>
                  {tasks.acceptedTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      bgColor="bg-yellow-200"
                      actions={
                        <>
                          <button 
                            onClick={() => handleCompleteTask(task)}
                            className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                          >
                            Complete
                          </button>
                          <button 
                            onClick={() => handleFailTask(task)}
                            className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                          >
                            Failed
                          </button>
                        </>
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className='bg-white overflow-hidden shadow-sm rounded-lg'>
            <div className='px-4 py-5 sm:p-6'>
              <h2 className='text-lg font-medium text-black mb-4'>Completed Tasks</h2>
              {tasks.completedTasks.length === 0 ? (
                <p className='text-black text-sm'>No completed tasks.</p>
              ) : (
                <div className='space-y-4'>
                  {tasks.completedTasks.map(task => (
                    <TaskCard key={task.id} task={task} bgColor="bg-green-200" actions={null} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Failed Tasks */}
          <div className='bg-white overflow-hidden shadow-sm rounded-lg'>
            <div className='px-4 py-5 sm:p-6'>
              <h2 className='text-lg font-medium text-black mb-4'>Failed Tasks</h2>
              {tasks.failedTasks.length === 0 ? (
                <p className='text-black text-sm'>No failed tasks.</p>
              ) : (
                <div className='space-y-4'>
                  {tasks.failedTasks.map(task => (
                    <TaskCard key={task.id} task={task} bgColor="bg-red-200" actions={null} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reject Task Modal */}
      {showRejectModal && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg max-w-md w-full'>
            <div className='px-4 pt-5 pb-4 sm:p-6'>
              <h3 className='text-lg font-medium text-black mb-4'>Reason for Rejection</h3>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className='w-full h-32 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
                placeholder='Enter reason for rejection'
              />
            </div>
            <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                onClick={confirmRejectTask}
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
              >
                Confirm Rejection
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeDashboard;
