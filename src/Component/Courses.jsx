// --- Courses.jsx ---
import React, { useEffect, useState } from "react";

import Coursecard from "./Coursecard";
import { useCourseStore } from "../Store/courseStore";

function Courses() {
  const { courses, fetchRecommendedCourses, loading, error } = useCourseStore();
  const [groupedCourses, setGroupedCourses] = useState({});
  const [activeCategory, setActiveCategory] = useState("");

  // Fetch courses from backend on mount
  useEffect(() => {
    fetchRecommendedCourses();
  }, [fetchRecommendedCourses]);

  // Group courses by category once they are fetched
  useEffect(() => {
    if (courses && courses.length > 0) {
      const grouped = courses.reduce((acc, course) => {
        const category = course.category || "Uncategorized";
        if (!acc[category]) acc[category] = [];
        acc[category].push(course);
        return acc;
      }, {});
      setGroupedCourses(grouped);

      // set default active category (first one)
      setActiveCategory(Object.keys(grouped)[0]);
    }
  }, [courses]);

  if (loading) {
    return (
      <div className="py-20 text-center text-lg text-[#014925] font-semibold">
        Loading courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-600 font-semibold">
        Error fetching courses: {error}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 font-semibold">
        No courses available yet.
      </div>
    );
  }

  // Display only the first 3 courses for each category
  const currentCourses = (groupedCourses[activeCategory] || []).slice(0, 3);

  return (
    <section className="py-16 bg-white text-center" id="courses">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#014925] mb-10">
          Our <span className="text-[#0C6F89]">Courses</span>
        </h2>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 flex-wrap mb-10">
          {Object.keys(groupedCourses).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border-2 font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#0C6F89] text-white border-[#0C6F89]"
                  : "text-[#0C6F89] border-[#0C6F89] hover:bg-[#0C6F89] hover:text-white"
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentCourses.map((course) => (
            <Coursecard
              key={course._id}
              id={course._id}
              image={course.course_thumbnail}
              category={course.subcategory || course.category}
              price={course.discount_price || course.original_price || 0}
              instructorImg={course.instructor_img}
              instructorName={course.instructor}
              title={course.course_title}
              lessons={course.sections || 0}
              short={course.short_description}
              duration={course.course_length || "N/A"}
              rating={course.average_rating || 0}
            />
          ))}
        </div>

        {/* See All Button */}
        <div className="mt-10">
          <a
            href="/courses"
            className="px-8 py-3 bg-[#0C6F89] text-white rounded-full font-semibold hover:bg-[#013b1f] transition-all"
          >
            See All Courses
          </a>
        </div>
      </div>
    </section>
  );
}

export default Courses;
