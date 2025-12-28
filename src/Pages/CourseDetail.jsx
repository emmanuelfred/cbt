// src/pages/CourseDetail.jsx - FIXED VERSION
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseStore } from "../Store/courseStore";
import { useAuthStore } from "../Store/authStore";
import { FaStar, FaPlayCircle, FaBookOpen, FaClock, FaUsers, FaBook } from "react-icons/fa";
import toast from "react-hot-toast";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { isAuthenticated, user, login, isLoading, error: authError } = useAuthStore();
  const { 
    course, 
    loading, 
    error: courseError, 
    fetchCourseDetail, 
    enroll 
  } = useCourseStore();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [playVideo, setPlayVideo] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCourseDetail(id);
    }
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setEnrolling(true);
    try {
      await enroll(user._id, course._id);
      toast.success("🎉 Successfully enrolled!");
      
      // Redirect to my courses
      setTimeout(() => {
        navigate("/dashboard/active");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Failed to enroll");
    } finally {
      setEnrolling(false);
    }
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      await login(loginData.email, loginData.password);
      
      // Wait for auth state to update
      setTimeout(() => {
        if (useAuthStore.getState().isAuthenticated) {
          setShowLoginModal(false);
          toast.success("✅ Logged in successfully!");
          handleEnroll();
        }
      }, 300);
    } catch (err) {
      toast.error("Login failed");
    }
  };

  if (loading && !course) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-[#014925]">
        <div className="spinner-border text-[#0C6F89]" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="ml-3">Loading course details...</p>
      </div>
    );
  }

  if (courseError) {
    return (
      <div className="text-center py-20">
        <div className="text-red-600 text-xl mb-4">Failed to load course details</div>
        <button 
          onClick={() => navigate("/")}
          className="bg-[#0C6F89] text-white px-6 py-2 rounded-full hover:bg-[#014925] transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (!course) return null;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-8">
        {/* LEFT COLUMN */}
        <div className="flex-[2] space-y-6">
          <h1 className="text-3xl font-bold text-[#014925] capitalize">
            {course.course_title}
          </h1>
          <p className="text-gray-700">{course.short_description}</p>

          {/* Ratings and Stats */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              <span className="font-semibold text-gray-900">
                {course.average_rating?.toFixed(1) || "0.0"}
              </span>
            </div>
            <span className="text-gray-500">
              ({course.total_ratings || 0} ratings)
            </span>
            <span className="text-gray-500 flex items-center gap-1">
              <FaUsers /> {course.enrollment_count || 0} students
            </span>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-3">
            {course.instructor_img && (
              <img
                src={course.instructor_img}
                alt={course.instructor}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold">{course.instructor}</p>
              {course.instructor_bio && (
                <p className="text-sm text-gray-600">{course.instructor_bio}</p>
              )}
            </div>
          </div>

          {/* Learning Outcomes */}
          {course.learning_outcomes?.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FaBook className="text-[#0C6F89]" />
                What you'll learn
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {course.learning_outcomes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {course.requirements?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Requirements</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {course.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {course.description && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{course.description}</p>
            </div>
          )}

          {/* Target Audience */}
          {course.target_audience?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Who this course is for</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {course.target_audience.map((audience, i) => (
                  <li key={i}>{audience}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Reviews */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Student Reviews</h2>
            {course.reviews?.length > 0 ? (
              <div className="space-y-3">
                {course.reviews.slice(0, 5).map((rev, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold">{rev.user_name}</p>
                      <p className="text-yellow-400">
                        {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                      </p>
                    </div>
                    <p className="text-gray-700">{rev.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(rev.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 space-y-6">
          {/* Intro Video */}
          <div className="relative w-full sticky top-4">
            {!playVideo ? (
              <div
                className="relative cursor-pointer group"
                onClick={() => setPlayVideo(true)}
              >
                <img
                  src={course.course_thumbnail}
                  alt={course.course_title}
                  className="w-full rounded-lg shadow-md object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg transition group-hover:bg-black/50">
                  <FaPlayCircle className="text-white text-6xl group-hover:scale-110 transition-transform" />
                </div>
              </div>
            ) : (
              <video
                controls
                autoPlay
                className="w-full rounded-lg shadow-md"
                poster={course.course_thumbnail}
              >
                <source src={course.intro_video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Enrollment Card */}
          <div className="rounded-lg shadow-lg p-6 bg-white border-2 border-[#0C6F89]">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-[#014925] mb-2">
                {course.is_free ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  <>
                    ₦{course.discount_price || course.original_price}
                    {course.discount_price && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        ₦{course.original_price}
                      </span>
                    )}
                  </>
                )}
              </div>
              {course.discount_price && (
                <span className="text-sm text-green-600 font-semibold">
                  Save {Math.round((1 - course.discount_price / course.original_price) * 100)}%
                </span>
              )}
            </div>

            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="bg-[#0C6F89] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#014925] transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </button>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <FaClock className="text-[#0C6F89]" />
                Duration: {course.course_length || "Self-paced"}
              </p>
              <p className="flex items-center gap-2">
                <FaBookOpen className="text-[#0C6F89]" />
                {course.sections?.length || 0} sections
              </p>
              <p className="flex items-center gap-2">
                <FaUsers className="text-[#0C6F89]" />
                {course.enrollment_count || 0} students enrolled
              </p>
            </div>

            {course.has_certificate && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                <p className="text-sm text-green-800 font-semibold">
                  🏆 Certificate of Completion Included
                </p>
              </div>
            )}
          </div>

          {/* Course Content */}
          {course.sections?.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-4">Course Content</h3>
              <div className="space-y-2">
                {course.sections.map((section, i) => (
                  <div
                    key={i}
                    className="border-b pb-3 last:border-b-0"
                  >
                    <div className="flex items-center gap-2 font-semibold text-[#014925] mb-2">
                      <FaBookOpen /> 
                      <span>Section {i + 1}: {section.title}</span>
                    </div>
                    {section.description && (
                      <p className="text-sm text-gray-600 mb-2 pl-6">
                        {section.description}
                      </p>
                    )}
                    {section.contents?.length > 0 && (
                      <ul className="pl-6 space-y-1 text-sm text-gray-700">
                        {section.contents.map((content, j) => (
                          <li
                            key={j}
                            className="flex justify-between items-center"
                          >
                            <span className="flex items-center gap-2">
                              {content.type === "video" && (
                                <FaPlayCircle className="text-[#0C6F89]" />
                              )}
                              {content.type === "pdf" && (
                                <FaBookOpen className="text-red-500" />
                              )}
                              {content.type === "quiz" && (
                                <span className="text-yellow-500">❓</span>
                              )}
                              {content.title}
                              {content.is_preview && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                  Preview
                                </span>
                              )}
                            </span>
                            {content.duration && (
                              <span className="text-gray-500 text-xs flex items-center gap-1">
                                <FaClock /> {content.duration} min
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold text-[#0C6F89] mb-4">
              Login to Continue
            </h3>

            {authError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                {authError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C6F89] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C6F89] focus:border-transparent"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#0C6F89] to-[#014925] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    navigate("/register");
                  }}
                  className="text-[#0C6F89] font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetail;