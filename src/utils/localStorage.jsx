const employees = [
  {
    id: 1,
    email: "employee1@example.com",
    password: "123",
    role: "Developer",
    tasks: [
      {
        active: true,
        newTask: false,
        completed: true,
        field: true,
        title: "Complete Project A",
        description: "Finalize the project documentation and submit.",
        date: "2024-10-01",
        category: "Project"
      },
      {
        active: false,
        newTask: true,
        completed: false,
        field: false,
        title: "Start Project B",
        description: "Kick off the initial planning phase.",
        date: "2024-10-10",
        category: "Project"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        field: true,
        title: "Weekly Team Meeting",
        description: "Attend the weekly sync-up with the team.",
        date: "2024-10-15",
        category: "Meeting"
      }
    ]
  },
  {
    id: 2,
    email: "employee2@example.com",
    password: "123",
    role: "Designer",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        field: true,
        title: "Research New Technologies",
        description: "Explore emerging technologies for potential adoption.",
        date: "2024-10-05",
        category: "Research"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        field: false,
        title: "Update Documentation",
        description: "Revise the user manual for clarity.",
        date: "2024-09-30",
        category: "Documentation"
      }
    ]
  },
  {
    id: 3,
    email: "employee3@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        field: true,
        title: "Client Feedback Review",
        description: "Gather feedback from clients on recent projects.",
        date: "2024-10-12",
        category: "Feedback"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        field: false,
        title: "Prepare Presentation for Q4",
        description: "Create a presentation for the upcoming quarterly review.",
        date: "2024-10-20",
        category: "Presentation"
      }
    ]
  },
  {
    id: 4,
    email: "employee4@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        field: true,
        title: "Onboard New Team Member",
        description: "Assist in onboarding the new hire and provide necessary training.",
        date: "2024-10-08",
        category: "Onboarding"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        field: false,
        title: "Monthly Report Submission",
        description: "Submit the monthly performance report to management.",
        date: "2024-09-25",
        category: "Reporting"
      }
    ]
  },
  {
    id: 5,
    email: "employee5@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        field: true,
        title: "Website Redesign Project",
        description: "Collaborate with the design team to revamp the company website.",
        date: "2024-10-18",
        category: "Project"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        field: false,
        title: "Team Building Activity Planning",
        description: "Organize a team-building event for next month.",
        date: "2024-09-28",
        category: "Event"
      }
    ]
  }
];

const admin = [
  {
    id: 101,
    email: 'admin@example.com',
    password: '123',
    tasks: [
      {
        active: true,
        newTask: false,
        completed: true,
        field: true,
        title: 'Review Employee Performance',
        description: 'Conduct performance reviews for all team members.',
        date: '2024-10-19',
        category: 'Review'
      },
      {
        active: true,
        newTask: true,
        completed: false,
        field: false,
        title: 'Plan Annual Company Retreat',
        description: 'Organize logistics and agenda for the annual retreat.',
        date: '2024-11-01',
        category: 'Event'
      }
    ]
  }
];

export const setLocalStorage = (data) => {
  if (data.employees) localStorage.setItem('employees', JSON.stringify(data.employees));
  if (data.admin) localStorage.setItem('admin', JSON.stringify(data.admin));
}

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const admin = JSON.parse(localStorage.getItem('admin')) || [];
  return { employees, admin };
}
