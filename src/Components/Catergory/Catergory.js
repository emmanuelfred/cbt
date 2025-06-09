import React, { useEffect, useState } from 'react';
import { FaPaintBrush, FaCode, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="course-grid">
      {loading
        ? Array(4)
            .fill()
            .map((_, index) => (
              <div key={index} className="catergory-card">
                <div className="icon-wrapper">
                  <Skeleton circle={true} height={50} width={50} />
                </div>
                <div>
                  <h4><Skeleton width={`80%`} /></h4>
                  <p><Skeleton width={`60%`} /></p>
                </div>
              </div>
            ))
        : courseData.map((course, index) => (
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
