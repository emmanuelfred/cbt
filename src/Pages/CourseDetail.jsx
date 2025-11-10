import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usecourseStore } from "../Store/courseStore";
import { FaStar, FaPlayCircle, FaBookOpen, FaClock } from "react-icons/fa";
import { useAuthStore } from "../Store/authStore";

const CourseDetail = () => {
  const { id } = useParams();
  const { isAuthenticated,user,login, isLoading, error} = useAuthStore();
  const [showUserModal, setShowUserModal] = useState(false);
  const [tempUser, setTempUser] = useState({ email: "", password: "" });
  const fetchCoursedetail = usecourseStore((s) => s.fetchCoursedetail);
  const course = usecourseStore((s) => s.course);
  const loading = usecourseStore((s) => s.loading);
  const course_error = usecourseStore((s) => s.error);
  const  enroll = usecourseStore((s) => s.enroll);

  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCoursedetail(id);
    }
  }, [id, fetchCoursedetail]);


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-[#014925]">
        Loading course details...
      </div>
    );

  if (course_error)
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load course details. Please try again later.
      </div>
    );
    const Enroll =  async () => {
    try {
      await enroll(user._id, course._id);
      alert("Successfully enrolled!");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Failed to enroll"));
    }
  };
  const handleEmrollment=()=>{
    if(!isAuthenticated){
      
      setShowUserModal(true);
    
      return;
    }
    Enroll();
    
  }
  const handleTempUserSubmit = async  () => {
    
    if (!tempUser.email || !tempUser.password) {
      alert("Please enter your Detail.");
      return;
    }
    await login(tempUser.email, tempUser.password);
    setTimeout(() => {
      if (!useAuthStore.getState().error && useAuthStore.getState().isAuthenticated) {
        setShowUserModal(false);
        Enroll();
        setTempUser({ email: "", password: "" });
      }
    }, 300);
    
  };

  if (!course) return null;

  return (
    <>
        <div className="mx-auto p-6 pt-20 md:pt-25 md:px-30 flex flex-col md:flex-row gap-8">
      {/* LEFT COLUMN */}
      <div className="flex-[2] space-y-6" id="left-col">
        <h1
          className="text-3xl font-bold text-[#014925]"
          style={{ textTransform: "capitalize" }}
        >
          {course.course_title}
        </h1>
        <p className="text-gray-700">{course.short_description}</p>

        {/* Ratings and Instructor */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar />
            <span className="font-semibold">{course.average_rating || 0}</span>
          </div>
          <span className="text-gray-500">
            ({course.total_ratings || 0} ratings)
          </span>
          <span className="text-gray-500">
            • {course.enrollment_count || 0} students
          </span>
        </div>

        <div className="flex items-center gap-3">
          {course.instructor_img && (
            <img
              src={course.instructor_img}
              alt={course.instructor}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <p className="font-semibold">{course.instructor}</p>
        </div>

        {/* Learning Outcomes */}
        {course.learning_outcomes?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">What you'll learn</h2>
            <ul className="list-disc ps-5 space-y-1 text-gray-700">
              {course.learning_outcomes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {course.requirements?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc ps-5 space-y-1 text-gray-700">
              {course.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Description */}
        {course.description && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{course.description}</p>
          </div>
        )}

        {/* Reviews */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Student Reviews</h2>
          {course.reviews?.length > 0 ? (
            course.reviews.map((rev, i) => (
              <div key={i} className="bg-[#0c70891c] p-3 mb-3 rounded-lg">
                <p className="font-semibold mb-1">{rev.user_name}</p>
                <p className="text-yellow-400 mb-1">
                  {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                </p>
                <p className="text-gray-700">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex-1 space-y-6" id="right-col">
        {/* ✅ INTRO VIDEO WITH THUMBNAIL OVERLAY */}
        <div className="relative w-full">
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
              {/* Play Icon Overlay */}
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

        {/* Course Content */}
        {course.sections?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Course Content</h2>
            {course.sections.map((section, i) => (
              <div
                key={i}
                className="rounded-lg p-4 mb-3 bg-[#0c70891c] shadow-sm"
              >
                <div className="flex items-center gap-2 font-semibold mb-2 text-[#014925]">
                  <FaBookOpen /> {section.title}
                </div>
                {section.contents?.length > 0 ? (
                  <ul className="ps-5 space-y-1">
                    {section.contents.map((content, j) => (
                      <li
                        key={j}
                        className="flex justify-between items-center text-gray-700"
                      >
                        <span className="flex items-center gap-2">
                          {content.type === "video" ? (
                            <FaPlayCircle className="text-[#0C6F89]" />
                          ) : (
                            <FaBookOpen className="text-[#014925]" />
                          )}
                          {content.title}
                        </span>
                        {content.duration && (
                          <span className="text-gray-500 text-sm flex items-center gap-1">
                            <FaClock /> {content.duration}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 ps-5">No content yet.</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Enrollment Card */}
        <div className="rounded-lg shadow-md p-4 bg-white text-center">
          <h3 className="text-2xl font-bold mb-3 text-[#014925]">
            ₦{course.discount_price || course.original_price}
          </h3>
          <button onClick={handleEmrollment} className="bg-[#0C6F89] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#014925] transition w-full">
            Enroll Now
          </button>
        </div>
      </div>
    </div>

       {/* User Info Modal */}
      {showUserModal && (
        <div style={modalOverlay}>
          <div style={modalContent} className="relative">
            <button className="absolute top-2 right-2 border-1 p-1 text-1xl  rounded-full w-8 h-8   text-[red]" style={{fontWeight:700, cursor:'pointer'}}
            onClick={()=>{
              setShowUserModal(false)
            }}
            >X</button>
            <h3 style={{ color: '#0C6F89' }}>Login to continue</h3>
              {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            
           <input
              type="email"
              placeholder="Enter your Email"
              value={tempUser.email}
              onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Enter Your Password"
              value={tempUser.password}
              onChange={(e) => setTempUser({ ...tempUser, password: e.target.value })}
              style={inputStyle}
            />

            <button onClick={handleTempUserSubmit} style={btnStyle}>
              {isLoading ? "Logging in..." : "Login"}
              </button>
          </div>
        </div>
      )}
    </>

  );
};
// Styles
const btnStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  background: 'linear-gradient(90deg, #0C6F89, #02894b)',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '8px 0',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContent = {
  background: 'white',
  padding: '30px',
  borderRadius: '10px',
  maxWidth: '400px',
    width: '90%',
  textAlign: 'center',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)'
};
export default CourseDetail;
