import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AllTask = () => {
  const {userData, addEmployee }  = useContext(AuthContext);

  return (
    <div className='bg-[#1c1c1c] p-5 mt-10 rounded h-48'>
      <div className='bg-gray-700 mb-2 py-2 px-4 flex justify-between rounded text-white font-semibold'>
        <h2 className='w-1/5'>First Name</h2>
        <h2 className='w-1/5'>Active Tasks</h2>
        <h2 className='w-1/5'>New Tasks</h2>
        <h2 className='w-1/5'>Completed</h2>
        <h2 className='w-1/5'>Failed</h2>
      </div>

      <div className='h-[80%] overflow-auto'>
        {userData.employees.map((employee, index) => {
          const taskCounts = employee.taskCounts || { active: 0, newTasks: 0, completed: 0, failed: 0 };
          return (
            <div
              key={index}
              className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'
            >
              <h2 className='w-1/5'>{employee.firstName || 'N/A'}</h2>
              <h2 className='w-1/5 text-blue-600'>{taskCounts.active}</h2>
              <h2 className='w-1/5 text-yellow-400'>{taskCounts.newTasks}</h2>
              <h2 className='w-1/5 text-green-400'>{taskCounts.completed}</h2>
              <h2 className='w-1/5 text-red-400'>{taskCounts.failed}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTask;
