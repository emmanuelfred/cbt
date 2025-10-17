import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaStar, FaPlayCircle, FaBookOpen, FaClock } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { usecourseStore } from "../store/courseStore";

const CourseDetail = () => {
  const { id } = useParams();
  const navigation = useNavigate()

  
  const {user} = useAuthStore();
  const {course,loading,error,fetchCoursedetail,enroll} = usecourseStore()

  useEffect(() => {
  fetchCoursedetail(id)
  }, [id]);
   const handleEnrollment = async ()=>{
    if(!user){
      navigation('/login')

    }
    navigation('/classroom?page=payment')
   

    
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <Skeleton height={300} />
        <Skeleton count={10} />
      </div>
    );
  }
 

  if (error) {
    return (
      <div className="container mt-5 text-center text-danger">
        <h3>{error}</h3>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="container " style={{paddingTop:100}}>
      <div className="row">
        {/* ===== LEFT COLUMN ===== */}
        <div className="col-md-8 course-info">
          <h3 className="fw-bold">{course.course_title}</h3>
          <p className="">{course.short_description}</p>

          {/* Rating */}
          <div className="d-flex align-items-center gap-2 mb-3">
            <FaStar className="text-warning" />
            <span className="fw-semibold">{course.average_rating}</span>
            <span className="text-secondary">
              ({course.total_ratings} ratings)
            </span>
            <span className="text-secondary">
              • {course.enrollment_count} students
            </span>
          </div>
          <div className="d-flex align-items-center  gap-3">
            <img src={course.instructor_img} alt="" style={{width:40,height:40,borderRadius:'50%'}}/>
              <p className=" ">
            <strong>{course.instructor}</strong>
          </p>
            
          </div>

         

          {/* ===== What You’ll Learn ===== */}
          {course.learning_outcomes?.length > 0 && (
            <div className="mb-5">
              <h4 className="fw-semibold mb-3">What you'll learn</h4>
              <ul className="list-disc ps-4">
                {course.learning_outcomes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ===== Requirements ===== */}
          {course.requirements?.length > 0 && (
            <div className="mb-5">
              <h4 className="fw-semibold mb-3">Requirements</h4>
              <ul className="list-disc ps-4">
                {course.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

      

          {/* ===== Description ===== */}
          {course.description && (
            <div className="mb-5">
              <h4 className="fw-semibold mb-3">Description</h4>
              <p className="">{course.description}</p>
            </div>
          )}

          {/* ===== Reviews ===== */}
          <div>
            <h4 className="fw-semibold mb-3">Student Reviews</h4>
            {course.reviews?.length > 0 ? (
              course.reviews.map((rev, i) => (
                <div key={i} className="border-bottom py-3">
                  <p className="fw-semibold mb-1">{rev.user_name}</p>
                  <p className="text-warning mb-1">
                    {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                  </p>
                  <p>{rev.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="col-md-4 course-img">
          {/* Thumbnail or video preview */}
          <div className="mb-4">
            {course.intro_video ? (
              <video
                controls
                poster={course.course_thumbnail}
                className="w-100 rounded shadow"
              >
                <source src={course.intro_video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={course.course_thumbnail}
                alt={course.course_title}
                className="w-100 rounded shadow"
              />
            )}
          </div>
              {/* ===== Course Content ===== */}
          <div className="mb-5">
            <h4 className="fw-semibold mb-3">Course Content</h4>
            {course.sections?.length > 0 ? (
              course.sections.map((section, i) => (
                <div key={i} className="border rounded p-3 mb-3 bg-light">
                  <span className="fw-semibold mb-2 d-flex align-items-center gap-2">
                    <FaBookOpen /> {section.title}
                  </span>
                  <ul className="ps-4">
                    {section.contents.map((content, j) => (
                      <li
                        key={j}
                        className="d-flex justify-content-between text-muted"
                      >
                        <span>
                          {content.type === "video" ? (
                            <FaPlayCircle className="me-2 text-success" />
                          ) : (
                            <FaBookOpen className="me-2 text-primary" />
                          )}
                          {content.title}
                        </span>
                        {content.duration && (
                          <span className="small text-secondary d-flex align-items-center">
                            <FaClock className="me-1" /> {content.duration}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No sections added yet.</p>
            )}
          </div>

          {/* Enrollment Card */}
          <div className="border rounded shadow-sm p-4 bg-white">
            <h4 className="fw-semibold mb-3">
              ₦{course.discount_price || course.original_price}
            </h4>
            <button className="btn btn-success w-100 fw-semibold" onClick={handleEnrollment}>
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
