import React, { useState } from 'react';

// ProjectSidebar Component
const ProjectSidebar = ({ projects, teamMembers }) => (
  <div style={styles.sidebar}>
    <h3>Projects</h3>
    <ul style={styles.list}>
      {projects.map((project, index) => (
        <li key={index} style={styles.listItem}>{project}</li>
      ))}
    </ul>
    <h3>Team Members</h3>
    <ul style={styles.list}>
      {teamMembers.map((member, index) => (
        <li key={index} style={styles.listItem}>
          <span>{member.name}</span>
          <span style={styles.status}>{member.status}</span>
          <span>{member.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

// TaskColumn Component
const TaskColumn = ({ status, tasks }) => (
  <div style={styles.taskColumn}>
    <h3>{status}</h3>
    {tasks.map((task, index) => (
      <div style={styles.taskCard} key={index}>
        <span style={styles.taskCategory}>{task.category}</span>
        <h4>{task.title}</h4>
        <div style={styles.taskInfo}>
          <span>Members: {task.members.join(", ")}</span>
          <span>Comments: {task.comments}</span>
          <span>Files: {task.files}</span>
        </div>
      </div>
    ))}
  </div>
);

// TaskBoard Component
const TaskBoard = ({ tasks }) => {
  const statuses = ["To Do", "In Progress", "Need Review", "Done"];

  return (
    <div style={styles.taskColumns}>
      {statuses.map(status => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasks.filter(task => task.status === status)}
        />
      ))}
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [projects] = useState(["Piper Enterprise", "Web platform", "Mobile Loop", "Wire Mobile App"]);
  const [teamMembers] = useState([
    { name: "Karen Smith", status: "Online", time: "05:23:46" },
    { name: "Steve McConnell", status: "Offline", time: "12:03:12" },
    { name: "Sarah Green", status: "Offline", time: "10:28:56" },
    { name: "Brad Smith", status: "Online", time: "11:03:48" },
    { name: "Alice Connell", status: "Online", time: "06:49:52" },
  ]);
  const [tasks] = useState([
    { title: "Wireframing", category: "UX stages", status: "To Do", members: [1, 2, 3], comments: 8, files: 11 },
    { title: "Customer Journey Mapping", category: "UX stages", status: "In Progress", members: [1, 2], comments: 3, files: 4 },
    { title: "Competitor research", category: "UX stages", status: "Need Review", members: [2, 4], comments: 5, files: 7 },
    { title: "Branding, visual identity", category: "Branding", status: "Done", members: [3, 4, 5], comments: 2, files: 5 },
  ]);

  return (
    <div style={styles.container}>
      <ProjectSidebar projects={projects} teamMembers={teamMembers} />
      <div style={styles.mainContent}>
        <h2>Piper Enterprise</h2>
        <TaskBoard tasks={tasks} />
      </div>
    </div>
  );
};

export default Dashboard;

// CSS in JS
const styles = {
  container: { display: 'flex', fontFamily: 'Arial, sans-serif', height: '100vh', padding: '20px' },
  sidebar: { width: '20%', padding: '20px', background: '#f7f7f7', borderRadius: '10px' },
  list: { listStyleType: 'none', padding: '0' },
  listItem: { padding: '10px 0', borderBottom: '1px solid #ddd' },
  status: { color: '#4caf50', fontWeight: 'bold' },
  mainContent: { flex: 1, padding: '20px' },
  taskColumns: { display: 'flex', justifyContent: 'space-between' },
  taskColumn: { width: '24%', padding: '10px', background: '#f7f7f7', borderRadius: '10px' },
  taskCard: { padding: '10px', background: '#fff', margin: '10px 0', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  taskCategory: { color: '#888', fontSize: '12px' },
  taskInfo: { fontSize: '12px', color: '#555' },
};
