import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { usecourseStore } from "../Store/courseStore";
import Coursecard from "../Component/Coursecard";

function CourseSearchPage() {
  const { courses, fetchRecommendedCourses, loading, error } = usecourseStore();
  const [groupedCourses, setGroupedCourses] = useState({});
  const [activeCategory, setActiveCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch courses from backend on mount
  useEffect(() => {
    fetchRecommendedCourses();
  }, [fetchRecommendedCourses]);

  // Group courses by category once fetched
  useEffect(() => {
    if (courses && courses.length > 0) {
      const grouped = courses.reduce((acc, course) => {
        const category = course.category || "Uncategorized";
        if (!acc[category]) acc[category] = [];
        acc[category].push(course);
        return acc;
      }, {});
      setGroupedCourses(grouped);

      // Set default active category (first one)
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

  // Get current courses based on active category and search
  const currentCourses =
    (groupedCourses[activeCategory] || []).filter((course) =>
      course.course_title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <section className="py-16 bg-white text-center min-h-screen" id="courses">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#014925] mb-6">
          Search <span className="text-[#0C6F89]">Courses</span>
        </h2>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-[#0C6F89] rounded-full py-3 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0C6F89]"
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0C6F89]"
          />
        </div>

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
          {currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <Coursecard
                key={course._id}
                id={course._id}
                image={course.course_thumbnail}
                category={course.subcategory || course.category}
                price={course.discount_price || course.original_price || 0}
                instructorImg={course.instructor_img}
                instructorName={course.instructor}
                title={course.course_title}
                short={course.short_description}
                lessons={course.sections || 0}
                duration={course.course_length || "N/A"}
                rating={course.average_rating || 0}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              No courses found for “{searchTerm}”.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CourseSearchPage;
