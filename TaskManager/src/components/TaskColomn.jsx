import React from 'react';

const TaskColumn = ({ status, tasks }) => {
  return (
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
};

export default TaskColumn;
