// NewTask.jsx
import React from 'react';

const NewTask = ({ data }) => {
  return (
    <div className='h-full flex-shrink-0 w-[350px] bg-yellow-400 rounded-xl p-5'>
      <div className='flex justify-between items-center'>
        <h3 className='bg-orange-600 px-3 py-1 rounded text-sm'>New Task</h3>
        <h4 className='text-sm'>{data.date}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semibold'>{data.title}</h2>
      <p className='text-sm mt-2'>{data.description}</p>
    </div>
  );
};

export default NewTask;
