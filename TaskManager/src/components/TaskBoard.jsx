import React from 'react';
import TaskColumn from './TaskColumn';

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

export default TaskBoard;
