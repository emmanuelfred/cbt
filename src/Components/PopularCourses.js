import React from 'react';
import Course from './Courses/Courses'; // Adjust the import path as necessary
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
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

function PopularCourses() {
  return (
    <div className="popular-courses-container mt-5 container">
      <div className="text-center mb-4">
        <h3>Our Popular Courses</h3>
        <h1>Explore Our Popular Courses</h1>
        <p>Discover a wide range of expert-led courses tailored to your personal and professional growth.</p>
      </div>

      <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }, // Now shows 4 courses on very large screens
            }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
          >
        {courses.map((course, index) => (
          <SwiperSlide key={index} className='slide-course' >
            <Course {...course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PopularCourses;
