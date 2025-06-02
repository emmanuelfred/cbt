import React from 'react';
import '../Style/StudentStack.css'; // Import the CSS file for styling

const students = [
  { id: 1, url: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, url: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 3, url: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 4, url: 'https://randomuser.me/api/portraits/women/4.jpg' },
  
];

const StudentStack = () => {
  return (
    <div className="avatar-stack">
      {students.map((student, index) => (
        <img
          key={student.id}
          src={student.url}
          alt={`Student ${student.id}`}
          className="avatar"
          style={{ left: `${index * 30}px`, zIndex: students.length - index }}
        />
      ))}
    </div>
  );
};

export default StudentStack;
