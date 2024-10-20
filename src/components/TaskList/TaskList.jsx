// TaskList.jsx
import React from 'react';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompletedTask from './CompleteTask';
import FailedTask from './FailedTask';

const TaskList = ({ data }) => {
  return (
    <div
      id='tasklist'
      className='h-[50%] overflow-x-auto flex items-center justify-start gap-5'
    >
      {data.tasks.map((elem, idx) => {
        if (elem.active) {
          return <AcceptTask key={idx} data={elem} />;
        }
        if (elem.newTask) {
          return <NewTask key={idx} data={elem} />;
        }
        if (elem.completed) {
          return <CompletedTask key={idx} data={elem} />;
        }
        if (elem.failed) {
          return <FailedTask key={idx} data={elem} />;
        }
        return null; // Handle any other cases safely
      })}
    </div>
  );
};

export default TaskList;
