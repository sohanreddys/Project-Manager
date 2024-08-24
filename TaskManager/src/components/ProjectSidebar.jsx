import React from 'react';

const ProjectSidebar = ({ projects, teamMembers }) => {
  return (
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
};

export default ProjectSidebar;
