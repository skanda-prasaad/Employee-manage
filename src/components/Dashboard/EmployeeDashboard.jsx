import React from "react"
import Header from "../other/Header"
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";

const EmployeeDashboard = (props) => {
  // You'll need to fetch or define the tasks data here
  const tasksData = {
    tasks: [
      // Add your tasks data here
      {
        title: "Prepare presentation slides",
        description: "Create slides for the project demo.",
        date: "25 Oct 2024",
        newTask: true,
      },
      {
        title: "Fix API issues",
        description: "Resolve bugs in the backend API.",
        date: "22 Oct 2024",
        completed: true,
      },
      {
        title: "Submit report",
        description: "Write and submit the final report.",
        date: "26 Oct 2024",
        failed: true,
      },
    ]
  };

  return (
    <div>
      <Header changeUser={props.changeUser} data={props.data}/>
      <TaskListNumbers data={props.data}/>
      <TaskList data={props.data} />
    </div>
  )
}

export default EmployeeDashboard;