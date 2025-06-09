import React, { useEffect, useState } from 'react';
import Course from './Courses/Courses';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';

import 'swiper/css';
import 'swiper/css/pagination';
import 'react-loading-skeleton/dist/skeleton.css';
import ImageWithLoading from './ImageWithLoading';

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

function PopularCourses() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulate async fetch
  }, []);

  const renderSkeletonCourse = () => (
    <div className="course-card">
      <div className="course-image">
        <ImageWithLoading height={180} />
        
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <Skeleton width={80} height={20} />
        </div>
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <Skeleton width={40} height={20} />
        </div>
      </div>

      <div className="course-content">
        <div className="instructor-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{overflow:'hidden',width:40,height:40,borderRadius:'50%'}}>

          <ImageWithLoading height={40} width={40}/>
        </div>
         
          <Skeleton width={100} height={15} />
        </div>

        <h3 className="course-title">
          <Skeleton width={`80%`} height={20} />
        </h3>

        <ul className="course-details">
          <li><Skeleton width={100} height={15} /></li>
          <li><Skeleton width={80} height={15} /></li>
          <li><Skeleton width={60} height={15} /></li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="popular-courses-container mt-5 container">
      {loading ? (
        <div className="text-center mb-4">
          <Skeleton width={'40%'} height={40} />
          <Skeleton width={'70%'} height={50} />
          <Skeleton width={'80%'} height={20} />
        </div>
      ) : (
        <div className="text-center mb-4">
          <h3>Our Popular Courses</h3>
          <h1>Explore Our Popular Courses</h1>
          <p>Discover a wide range of expert-led courses tailored to your personal and professional growth.</p>
        </div>
      )}

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {(loading ? Array(4).fill({}) : courses).map((course, index) => (
          <SwiperSlide key={index} className="slide-course">
            {loading ? renderSkeletonCourse() : <Course {...course} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PopularCourses;

