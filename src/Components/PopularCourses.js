import React, { useEffect, useState } from "react";
import Course from "./Courses/Courses";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import "swiper/css";
import "swiper/css/pagination";
import "react-loading-skeleton/dist/skeleton.css";
import ImageWithLoading from "./ImageWithLoading";
import { usecourseStore } from "../store/courseStore";

function PopularCourses() {

  
  
  const {courses,fetchRecommendedCourses,loading,error}= usecourseStore()

  // ✅ Fetch courses from backend API
  useEffect(() => {
   fetchRecommendedCourses()
  }, []);
  console.log(courses)

  const renderSkeletonCourse = () => (
    <div className="course-card" >
      <div className="course-image">
        <ImageWithLoading height={180} />
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <Skeleton width={80} height={20} />
        </div>
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <Skeleton width={40} height={20} />
        </div>
      </div>

      <div className="course-content">
        <div
          className="instructor-info"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <div style={{ overflow: "hidden", width: 40, height: 40, borderRadius: "50%" }}>
            <ImageWithLoading height={40} width={40} />
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
          <Skeleton width={"40%"} height={40} />
          <Skeleton width={"70%"} height={50} />
          <Skeleton width={"80%"} height={20} />
        </div>
      ) : error ? (
        <div className="text-center text-danger mb-4">
          <h4>{error}</h4>
        </div>
      ) : (
        <div className="text-center mb-4">
          <h3>Our Popular Courses</h3>
          <h1>Explore Our Popular Courses</h1>
          <p>
            Discover a wide range of expert-led courses tailored to your personal
            and professional growth.
          </p>
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
            {loading ? (
              renderSkeletonCourse()
            ) : (
              <Course
              id={course._id}
                image={course.course_thumbnail}
                category={course.category || "General"}
                price={course.discount_price || course.original_price || 0}
                instructorImg={course.instructor_img}
                instructorName={course.instructor}
                title={course.course_title}
                lessons={course.sections}
                duration={`${course.course_length || "0"}h`}
                rating={course.average_rating || 0}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PopularCourses;
