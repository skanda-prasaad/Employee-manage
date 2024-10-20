import React, { useState, useEffect } from 'react';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [newTask, setTask] = useState({});

  useEffect(() => {
    if (Object.keys(task).length > 0) {
      console.log('Task created:', task); // Log after task state updates
    }
  }, [task]);

  const submitHandler = (e) => {
    e.preventDefault();
    setTask({
      title,
      deadline,
      assignTo,
      category,
      description,
      active: false,
      newTask: true,
      failed: true,
      completed: false
    });

    const data = userData.employees

    data.forEach(function (elem) {
      if (assignTo === elem.firstName) {
        elem.tasks.push(newTask)
        console.log(elem.tasks)
        // console.log(elem)
      }
    })


    setAssignTo("")
    setCategory("")
    setDeadline("")
    setDescription("")
    setTitle("")

  };

  return (
    <div>
      <div className='p-5 bg-[#1c1c1c] rounded mt-7'>
        <form onSubmit={submitHandler} className="flex flex-wrap items-start justify-between w-full">
          <div className='w-1/2'>
            <div>
              <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                type="text"
                placeholder="Enter task title"
              />
            </div>
            <div>
              <h3 className='text-sm text-gray-300 mb-0.5'>Deadline</h3>
              <input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                type="date"
              />
            </div>
            <div>
              <h3 className='text-sm text-gray-300 mb-0.5'>Assign to</h3>
              <input
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                type="text"
                placeholder='Employee name'
              />
            </div>
            <div>
              <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                type="text"
                placeholder='Design, Dev...'
              />
            </div>
          </div>
          <div className='w-2/5 flex flex-col items-start'>
            <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400'
              placeholder="Enter task description"
            />
            <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
