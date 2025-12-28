// src/pages/MyCourses.jsx - Student Dashboard
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
  FaBook, 
  FaClock, 
  FaPlayCircle, 
  FaTrophy, 
  FaChartLine,
  FaCertificate,
  FaCalendar
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthStore } from "../../Store/authStore";
import { useCourseStore } from "../../Store/courseStore";

const MyCourses = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const {
    activeEnrollments,
    completedEnrollments,
    enrollmentStats,
    getActiveEnrollments,
    getCompletedEnrollments,
    getEnrollmentStats,
    loading,
  } = useCourseStore();

  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to view your courses");
      navigate("/login");
      return;
    }

    loadEnrollments();
  }, [user, isAuthenticated]);

  const loadEnrollments = async () => {
    try {
      await Promise.all([
        getActiveEnrollments(user._id),
        getCompletedEnrollments(user._id),
        getEnrollmentStats(user._id),
      ]);
    } catch (error) {
      console.error("Failed to load enrollments:", error);
      toast.error("Failed to load courses");
    }
  };

  const handleContinueLearning = (enrollment) => {
    navigate(`/dashboard/learn/${enrollment._id}`);
  };

  const handleViewCertificate = (enrollment) => {
    navigate(`/dashboard/certificate/${enrollment._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-[#0C6F89]" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#014925] mb-2">
            My Courses
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.name || user?.email}! Continue your learning journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Courses</p>
                <p className="text-3xl font-bold text-[#014925]">
                  {enrollmentStats.total_enrollments || 0}
                </p>
              </div>
              <FaBook className="text-4xl text-[#0C6F89]" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {enrollmentStats.completed_enrollments || 0}
                </p>
              </div>
              <FaTrophy className="text-4xl text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">
                  {enrollmentStats.incomplete_enrollments || 0}
                </p>
              </div>
              <FaChartLine className="text-4xl text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Certificates</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {completedEnrollments.filter(e => e.certificate_issued).length || 0}
                </p>
              </div>
              <FaCertificate className="text-4xl text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === "active"
                  ? "border-b-2 border-[#0C6F89] text-[#0C6F89]"
                  : "text-gray-500 hover:text-[#0C6F89]"
              }`}
            >
              Active Courses ({activeEnrollments.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === "completed"
                  ? "border-b-2 border-[#0C6F89] text-[#0C6F89]"
                  : "text-gray-500 hover:text-[#0C6F89]"
              }`}
            >
              Completed ({completedEnrollments.length})
            </button>
          </div>
        </div>

        {/* Course List */}
        <div className="space-y-6">
          {activeTab === "active" && (
            <>
              {activeEnrollments.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No active courses yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start learning by enrolling in a course!
                  </p>
                  <button
                    onClick={() => navigate("/courses")}
                    className="bg-[#0C6F89] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#014925] transition"
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                activeEnrollments.map((enrollment) => (
                  <div
                    key={enrollment._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={enrollment.course?.course_thumbnail}
                          alt={enrollment.course?.course_title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-[#014925] mb-2">
                              {enrollment.course?.course_title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              by {enrollment.course?.instructor}
                            </p>
                          </div>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {enrollment.overall_progress}% Complete
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>{enrollment.overall_progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-[#0C6F89] to-[#014925] h-3 rounded-full transition-all"
                              style={{ width: `${enrollment.overall_progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-[#0C6F89]" />
                            <span>
                              Enrolled: {new Date(enrollment.enrolled_on).toLocaleDateString()}
                            </span>
                          </div>
                          {enrollment.last_accessed && (
                            <div className="flex items-center gap-2">
                              <FaClock className="text-[#0C6F89]" />
                              <span>
                                Last accessed: {new Date(enrollment.last_accessed).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleContinueLearning(enrollment)}
                            className="flex items-center gap-2 bg-[#0C6F89] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#014925] transition"
                          >
                            <FaPlayCircle />
                            Continue Learning
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === "completed" && (
            <>
              {completedEnrollments.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <FaTrophy className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No completed courses yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Complete your first course to earn a certificate!
                  </p>
                </div>
              ) : (
                completedEnrollments.map((enrollment) => (
                  <div
                    key={enrollment._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 relative">
                        <img
                          src={enrollment.course?.course_thumbnail}
                          alt={enrollment.course?.course_title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <FaTrophy /> Completed
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <h3 className="text-2xl font-bold text-[#014925] mb-2">
                          {enrollment.course?.course_title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          by {enrollment.course?.instructor}
                        </p>

                        <div className="flex gap-6 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-[#0C6F89]" />
                            <span>
                              Completed: {new Date(enrollment.completed_on).toLocaleDateString()}
                            </span>
                          </div>
                          {enrollment.certificate_issued && (
                            <div className="flex items-center gap-2 text-green-600 font-semibold">
                              <FaCertificate />
                              <span>Certificate Earned</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3">
                          {enrollment.certificate_issued && (
                            <button
                              onClick={() => handleViewCertificate(enrollment)}
                              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
                            >
                              <FaCertificate />
                              View Certificate
                            </button>
                          )}
                          <button
                            onClick={() => handleContinueLearning(enrollment)}
                            className="flex items-center gap-2 border-2 border-[#0C6F89] text-[#0C6F89] px-6 py-2 rounded-full font-semibold hover:bg-[#0C6F89] hover:text-white transition"
                          >
                            <FaPlayCircle />
                            Review Course
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;