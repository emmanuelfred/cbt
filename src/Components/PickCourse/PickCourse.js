import React,{useState} from 'react'
import Course from '../Courses/Courses';
import './PickCourse.css'

import { FaPlay, FaBook, FaClock, FaStarHalfAlt } from 'react-icons/fa';




const courses = [
    {
      image: 'https://kinforce.net/learen/wp-content/uploads/2022/08/coding-web-game-at-home-V3L73RC.jpg',
      category: 'Business',
      price: 35,
      instructorImg: 'https://kinforce.net/learen/wp-content/uploads/2022/08/portrait-of-a-confident-young-businessman-with-han-VC5ZTQW.jpg',
      instructorName: 'Jane Cooper',
      title: 'Effective business pages on social media',
      lessons: 13,
      duration: '3h 15m',
      rating: 4.2,
    },
    {
      image: 'https://kinforce.net/learen/wp-content/uploads/2022/08/coding-web-game-at-home-V3L73RC.jpg',
      category: 'Business',
      price: 35,
      instructorImg: 'https://kinforce.net/learen/wp-content/uploads/2022/08/portrait-of-a-confident-young-businessman-with-han-VC5ZTQW.jpg',
      instructorName: 'Jane Cooper',
      title: 'Effective business pages on social media',
      lessons: 13,
      duration: '3h 15m',
      rating: 4.2,
    },
    {
      image: 'https://kinforce.net/learen/wp-content/uploads/2022/08/coding-web-game-at-home-V3L73RC.jpg',
      category: 'Business',
      price: 35,
      instructorImg: 'https://kinforce.net/learen/wp-content/uploads/2022/08/portrait-of-a-confident-young-businessman-with-han-VC5ZTQW.jpg',
      instructorName: 'Jane Cooper',
      title: 'Effective business pages on social media',
      lessons: 13,
      duration: '3h 15m',
      rating: 4.2,
    },
    {
      image: 'https://kinforce.net/learen/wp-content/uploads/2022/08/coding-web-game-at-home-V3L73RC.jpg',
      category: 'Business',
      price: 35,
      instructorImg: 'https://kinforce.net/learen/wp-content/uploads/2022/08/portrait-of-a-confident-young-businessman-with-han-VC5ZTQW.jpg',
      instructorName: 'Jane Cooper',
      title: 'Effective business pages on social media',
      lessons: 13,
      duration: '3h 15m',
      rating: 4.2,
    },
    {
      image: 'https://kinforce.net/learen/wp-content/uploads/2022/08/coding-web-game-at-home-V3L73RC.jpg',
      category: 'Business',
      price: 35,
      instructorImg: 'https://kinforce.net/learen/wp-content/uploads/2022/08/portrait-of-a-confident-young-businessman-with-han-VC5ZTQW.jpg',
      instructorName: 'Jane Cooper',
      title: 'Effective business pages on social media',
      lessons: 13,
      duration: '3h 15m',
      rating: 4.2,
    },
    {
      image: 'https://kinforce.net/learen/wp-content/uploads/2022/08/coding-web-game-at-home-V3L73RC.jpg',
      category: 'Business',
      price: 35,
      instructorImg: 'https://kinforce.net/learen/wp-content/uploads/2022/08/portrait-of-a-confident-young-businessman-with-han-VC5ZTQW.jpg',
      instructorName: 'Jane Cooper',
      title: 'Effective business pages on social media',
      lessons: 13,
      duration: '3h 15m',
      rating: 4.2,
    },
    // Add more course objects as needed
  ];

function PickCourse() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < courses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
    
  return (
  <>
   <div className='slider-container'>
      <h3>Recommended Courses</h3>
      <div className="slider-wrapper">
        <button className="nav-button left" onClick={prevSlide} disabled={currentIndex === 0}>
          &#10094;
        </button>

        <div className="slider-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {courses.map((course, index) => (
            <div key={index} className="slider-slide">
              <div className="recommanded-course">
                <div className="course-image">
                  <img src={course.image} alt="Course Cover" />
                  <span className="course-category">{course.category}</span>
                  <span className="course-price"><FaPlay /></span>
                </div>

                <div className="course-content">
                  <div className="instructor-info">
                    <img src={course.instructorImg} alt="Instructor" className="instructor-img" />
                    <span className="instructor-name">{course.instructorName}</span>
                  </div>
                  <h3 className="course-title">{course.title}</h3>
                  <ul className="course-details">
                    <li><FaBook className="icon" /> {course.lessons} Lessons</li>
                    <li><FaClock className="icon" /> {course.duration}</li>
                    <li><FaStarHalfAlt className="icon" /> {course.rating}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-button right" onClick={nextSlide} disabled={currentIndex >= courses.length - 1}>
          &#10095;
        </button>
      </div>
    </div>
        <hr/>
        <div className='PickCourse'>
                {courses.map((course, index) => (
                <div key={index} className='slide-course' >
                    <Course {...course} />
                </div>
                ))}
            </div>
  
  
  </>
   
  )
}

export default PickCourse