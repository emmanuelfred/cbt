import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../Store/authStore";
import { usecourseStore } from "../../Store/courseStore";

function ActiveCourse() {
  const { user } = useAuthStore();
  const {
    getActiveEnrollments,
    getExpiredEnrollments,
    getCompletedEnrollments,
    activeEnrollments,
    expiredEnrollments,
    completedEnrollments,
    loading,
  } = usecourseStore();

  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    if (user?._id) {
      getActiveEnrollments(user._id);
      getExpiredEnrollments(user._id);
      getCompletedEnrollments(user._id);
    }
  }, [user]);
  console.log(activeEnrollments)

  const renderCourses = (courses, emptyText) => {
    if (loading) return <p className="text-gray-500">Loading courses...</p>;
    if (!courses || courses.length === 0)
      return <p className="text-gray-500">{emptyText}</p>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {courses.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition duration-200"
          >
            <img
              src={item.course?.course_thumbnail}
              alt={item.course?.course_title}
              className="rounded-lg h-40 w-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800 capitalize">
              {item.course?.course_title}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              Instructor: {item.course?.instructor}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
              <span>
                Progress:{" "}
                <span className="font-medium text-[#0C6F89]">
                  {item.progress?.complete || 0}%
                </span>
              </span>
              <span>
                Enrolled:{" "}
                {new Date(item.enrolled_on).toLocaleDateString("en-US")}
              </span>
            </div>
            <div className="mt-3 flex justify-end">
             
                <a
                  href={`./course/${item.access_token}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm bg-[#0C6F89] text-white px-4 py-2 rounded-lg hover:bg-[#094c61] transition"
                >
                  Continue
                </a>
              
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        My Learning Progress
      </h2>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        {[
          { id: "active", label: "Active Courses 🟢" },
          { id: "completed", label: "Completed Courses 🟣" },
          { id: "expired", label: "Expired Courses 🔴" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 text-sm font-medium rounded-t-md transition-all ${
              activeTab === tab.id
                ? "border-b-2 border-[#0C6F89] text-[#0C6F89] bg-[#E1F5F9]"
                : "text-gray-500 hover:text-[#0C6F89]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "active" &&
        renderCourses(activeEnrollments, "You have no active courses yet.")}
      {activeTab === "completed" &&
        renderCourses(
          completedEnrollments,
          "You haven’t completed any course yet — keep going!"
        )}
      {activeTab === "expired" &&
        renderCourses(
          expiredEnrollments,
          "No expired courses. Great job staying active!"
        )}
    </div>
  );
}

export default ActiveCourse;
