import React from 'react';
import './Courses.css';
import { FaBook, FaClock, FaStarHalfAlt } from 'react-icons/fa';

const Course = ({ image, category, price, instructorImg, instructorName, title, lessons, duration, rating }) => {
  return (
    <div className="course-card">
      <div className="course-image">
        <img src={image} alt="Course Cover" />
        <span className="course-category">{category}</span>
        <span className="course-price">${price}</span>
      </div>

      <div className="course-content">
        <div className="instructor-info">
          <img src={instructorImg} alt="Instructor" className="instructor-img" />
          <span className="instructor-name">{instructorName}</span>
        </div>

        <h3 className="course-title">{title}</h3>

        <ul className="course-details">
          <li> <FaBook className="icon " /> {lessons} Lessons</li>
          <li><FaClock  className="icon "/> {duration}</li>
          <li> <FaStarHalfAlt className="icon " /> {rating}</li>
        </ul>
      </div>
    </div>
  );
};

export default Course;
