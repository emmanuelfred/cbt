import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Coursecard from "./Coursecard";
import { useCourseStore } from "../Store/courseStore";

function RecommendedCourses() {
  const { courses, fetchRecommendedCourses, loading, error } = usecourseStore();

  useEffect(() => {
    fetchRecommendedCourses();
  }, [fetchRecommendedCourses]);

  console.log("Courses from backend:", courses);

  return (
    <div
      className="popular-courses-container mt-5"
      style={{ maxWidth: "1100px", margin: "auto" }}
    >
      <div className="section-head flex justify-between items-center mb-4">
        <h3>Recommended Courses</h3>
        <div className="see-all">
          <a href="#">See All</a>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {(loading ? Array(3).fill({}) : courses).map((course, index) => (
          <SwiperSlide key={course._id || index} className="slide-course">
            <Coursecard
              id={course._id}
              image={course.course_thumbnail}
              category={course.category}
              price={
                course.is_free
                  ? "Free"
                  : course.discount_price || course.original_price
              }
              instructorImg={course.instructor_img}
              instructorName={course.instructor}
              title={course.course_title}
              lessons={course.sections}
              short={course.short_description}
              duration={`${course.course_length} hrs`}
              rating={course.average_rating || 0}
              loading={loading}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default RecommendedCourses;
