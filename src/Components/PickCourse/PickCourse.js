import React from 'react'
import Course from '../Courses/Courses';
import './PickCourse.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaPlay, FaBook, FaClock, FaStarHalfAlt } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



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
    
  return (
  <>
    <div className='recommanded-container' style={{width:'100%',maxWidth:1000}}>
        <h3>Recommended Courses</h3>
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
           
            breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            }}
            style={{width:'100%'}}
        >
            {courses.map((course, index) => (
            <SwiperSlide key={index}>
                <div
                className='recommanded-course'
                style={{
                    maxWidth: 400,
                    height: 157,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}
                >
                <div className="course-image" style={{ height: '100%', width: '40%', position: 'relative' }}>
                    <img
                    src={course.image}
                    alt="Course Cover"
                    style={{ height: '100%', objectFit: 'cover', width: '100%' }}
                    />
                    <span className="course-category" style={{ position: 'absolute', top: 10, left: 10 }}>{course.category}</span>
                    <span className="course-price" style={{ position: 'absolute', right: 10, bottom: 10, width: 35, height: 35 }}>
                    <FaPlay />
                    </span>
                </div>

                <div className="course-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '5px' }}>
                    <div className="instructor-info" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <img
                        src={course.instructorImg}
                        alt="Instructor"
                        className="instructor-img"
                        style={{ width: 30, height: 30, borderRadius: '50%' }}
                    />
                    <span className="instructor-name">{course.instructorName}</span>
                    </div>

                    <h3 className="course-title" style={{ margin: '5px 0' }}>{course.title}</h3>

                    <ul className="course-details" style={{ padding: 0, listStyle: 'none', fontSize: 12 }}>
                    <li><FaBook className="icon" /> {course.lessons} Lessons</li>
                    <li><FaClock className="icon" /> {course.duration}</li>
                    <li><FaStarHalfAlt className="icon" /> {course.rating}</li>
                    </ul>
                </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
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