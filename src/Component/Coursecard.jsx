import React from "react";
import { FaBook, FaClock, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Coursecard = ({
  id,
  image,
  category,
  price,
  instructorImg,
  instructorName,
  title,
  lessons,
  duration,
  rating,
  loading = false,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/course/${id}`)}
      className="relative bg-white rounded-xl shadow-md border border-gray-200 
                 overflow-hidden transition-all duration-300 hover:-translate-y-2 
                 hover:shadow-lg cursor-pointer flex flex-col"
    >
      {/* Course Image Section */}
      <div className="relative">
        <img
          src={image}
          alt="Course Cover"
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-3 left-3 bg-[#0C6F89] text-white text-xs px-3 py-1 rounded-md">
          {category}
        </span>
        <span
          className="absolute -bottom-6 right-3 bg-[#0C6F89] text-white font-semibold
                     w-14 h-14 rounded-full flex items-center justify-center shadow-md"
        >
          ${price}
        </span>
      </div>

      {/* Course Content */}
      <div className="p-4 mt-6">
        {/* Instructor Info */}
        <div className="flex items-center mb-3">
          <img
            src={instructorImg}
            alt="Instructor"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span className="font-medium text-gray-800">{instructorName}</span>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Course Details */}
        <ul className="flex items-center gap-5 text-sm text-gray-600">
          <li className="flex items-center gap-1">
            <FaBook className="text-[#0C6F89]" /> {lessons} Lessons
          </li>
          <li className="flex items-center gap-1">
            <FaClock className="text-[#0C6F89]" /> {duration}
          </li>
          <li className="flex items-center gap-1">
            <FaStarHalfAlt className="text-yellow-500" /> {rating}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coursecard;
