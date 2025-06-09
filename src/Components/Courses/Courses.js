import React from 'react';
import './Courses.css';
import { FaBook, FaClock, FaStarHalfAlt } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Course = ({
  image,
  category,
  price,
  instructorImg,
  instructorName,
  title,
  lessons,
  duration,
  rating,
  loading = false
}) => {
  return (
    <div className="course-card">
      <div className="course-image">
        {loading ? (
          <Skeleton height={180} />
        ) : (
          <img src={image} alt="Course Cover" />
        )}
        <span className="course-category">
          {loading ? <Skeleton width={80} /> : category}
        </span>
        <span className="course-price">
          {loading ? <Skeleton width={60} /> : `$${price}`}
        </span>
      </div>

      <div className="course-content">
        <div className="instructor-info">
          {loading ? (
            <Skeleton circle height={40} width={40} />
          ) : (
            <img src={instructorImg} alt="Instructor" className="instructor-img" />
          )}
          <span className="instructor-name">
            {loading ? <Skeleton width={100} /> : instructorName}
          </span>
        </div>

        <h3 className="course-title">
          {loading ? <Skeleton height={24} width={`80%`} /> : title}
        </h3>

        <ul className="course-details">
          <li><FaBook className="icon" /> {loading ? <Skeleton width={80} /> : `${lessons} Lessons`}</li>
          <li><FaClock className="icon" /> {loading ? <Skeleton width={60} /> : duration}</li>
          <li><FaStarHalfAlt className="icon" /> {loading ? <Skeleton width={50} /> : rating}</li>
        </ul>
      </div>
    </div>
  );
};

export default Course;
