import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, fetchProjects, fetchTeamMembers } from "../api";


// Sidebar Component
const Sidebar = ({ projects, teamMembers }) => (
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

// TaskForm Component
const TaskForm = ({ onClose, onSave }) => {
  const [task, setTask] = useState({
    title: "",
    category: "",
    status: "To Do",
    members: [],
    comments: 0,
    files: 0,
    priority: "Medium",
    deadline: "",
    duration: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createTask(task);
      onSave(task);
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div style={styles.modal}>
      <h3>Create New Task</h3>
      <label>
        Title:
        <input type="text" name="title" value={task.title} onChange={handleChange} />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={task.category} onChange={handleChange} />
      </label>
      <label>
        Priority:
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>
      <label>
        Deadline:
        <input type="date" name="deadline" value={task.deadline} onChange={handleChange} />
      </label>
      <label>
        Duration:
        <input type="text" name="duration" value={task.duration} onChange={handleChange} />
      </label>
      <button onClick={handleSubmit}>Save Task</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

// TaskColumn Component
const TaskColumn = ({ status, tasks }) => (
  <div style={styles.taskColumn}>
    <h3>{status}</h3>
    {tasks.map((task, index) => (
      <div style={styles.taskCard} key={index}>
        <h4>{task.title}</h4>
        <p style={styles.taskCategory}>{task.category}</p>
        <p style={styles.taskInfo}>Priority: {task.priority}</p>
        <p style={styles.taskInfo}>Deadline: {task.deadline}</p>
        <p style={styles.taskInfo}>Duration: {task.duration}</p>
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
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState("Priority");

  useEffect(() => {
    const loadData = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
        const projectsData = await fetchProjects();
        setProjects(projectsData);
        const teamMembersData = await fetchTeamMembers();
        setTeamMembers(teamMembersData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const addTask = async (newTask) => {
    try {
      await createTask(newTask);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const sortedTasks = tasks.sort((a, b) => {
    if (filter === "Priority") {
      return a.priority.localeCompare(b.priority);
    } else if (filter === "Deadline") {
      return new Date(a.deadline) - new Date(b.deadline);
    } else if (filter === "Duration") {
      return parseInt(a.duration) - parseInt(b.duration);
    }
    return 0;
  });

  return (
    <div style={styles.container}>
      <Sidebar projects={projects} teamMembers={teamMembers} />
      <div style={styles.mainContent}>
        <h2>Piper Enterprise</h2>
        <button onClick={() => setShowTaskForm(true)} style={styles.addButton}>Add Task</button>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.filter}>
          <option value="Priority">Priority</option>
          <option value="Deadline">Deadline</option>
          <option value="Duration">Duration</option>
        </select>
        <TaskBoard tasks={sortedTasks} />
      </div>
      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} onSave={addTask} />}
    </div>
  );
};

const styles = {
  container: { display: 'flex', fontFamily: 'Arial, sans-serif', height: '100vh', padding: '20px' },
  sidebar: { width: '250px', padding: '20px', background: '#f4f4f4', borderRadius: '10px', marginRight: '20px' },
  list: { listStyleType: 'none', padding: 0 },
  listItem: { padding: '10px', borderBottom: '1px solid #ddd' },
  status: { float: 'right', color: '#777' },
  mainContent: { flex: 1, padding: '20px' },
  taskColumns: { display: 'flex', justifyContent: 'space-between' },
  taskColumn: { width: '24%', padding: '10px', background: '#f7f7f7', borderRadius: '10px' },
  taskCard: { padding: '10px', background: '#fff', margin: '10px 0', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  taskCategory: { color: '#888', fontSize: '12px' },
  taskInfo: { fontSize: '12px', color: '#555' },
  addButton: { margin: '10px 0', padding: '10px 20px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px' },
  filter: { margin: '10px 0', padding: '5px', borderRadius: '5px' },
  modal: { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' },
};

export default Dashboard;
