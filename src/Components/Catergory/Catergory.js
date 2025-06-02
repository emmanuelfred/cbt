import React from 'react';
import { FaPaintBrush, FaCode, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import './Catergory.css'; // Optional CSS

const courseData = [
  {
    title: 'Creative Design & Media',
    subtitle: 'Unleash Your Creative Potential',
    icon: <FaPaintBrush className="icon" />,
  },
  {
    title: 'Web & App Development',
    subtitle: 'Build the Future Today',
    icon: <FaCode className="icon" />,
  },
  {
    title: 'Digital Marketing',
    subtitle: 'Grow Your Brand Online',
    icon: <FaChartLine className="icon" />,
  },
  {
    title: 'Cyber Security',
    subtitle: 'Defend Digital Frontiers',
    icon: <FaShieldAlt className="icon" />,
  },
  
];

const Catergory = () => {
  return (
    <div className="course-grid">
      {courseData.map((course, index) => (
        <a href="#" key={index} className="catergory-card">
          <div className="icon-wrapper">{course.icon}</div>
          <div>
          <h4>{course.title}</h4>
          <p>{course.subtitle}</p>

          </div>
        
        </a>
      ))}
    </div>
  );
};

export default Catergory;
