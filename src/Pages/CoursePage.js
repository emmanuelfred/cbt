import { useState } from "react";
import CourseContent from "../Components/CourseContent/CourseContent";
import LessonViewer from "../Components/CourseContent/LessonViewer"
import { Menu, X } from "lucide-react";
import { FiChevronDown } from 'react-icons/fi';

const CoursePage = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showContent, setShowContent] = useState(false); // For mobile toggle

  const course = {
    title: "Full Stack Web Dev",
    sections: [
      {
        title: "Introduction",
        lessons: [
          { _id: "1", title: "Welcome", type: "video", contentUrl: "/videos/intro.mp4" },
          { _id: "2", title: "Course Overview", type: "pdf", contentUrl: "/docs/overview.pdf" },
        ],
      },
      {
        title: "HTML Basics",
        lessons: [
          { _id: "3", title: "HTML Tags", type: "image", contentUrl: "/images/html-tags.png" },
          { _id: "4", title: "Quiz: HTML", type: "quiz", quiz: {} },
        ],
      },
    ],
  };

  return (
    <div className="px-4 py-6" style={{paddingTop:120}}>
      {/* Toggle button for mobile */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{course.title}</h2>
        <button
          className="p-2 bg-gray-200 rounded"
          onClick={() => setShowContent((prev) => !prev)}
        >
          {showContent ? <X size={24} /> :  <FiChevronDown size={24} />}
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Course Content: show or hide based on toggle */}
        <div
          className={`${
            showContent ? "block" : "hidden"
          } md:block md:w-1/3`}
        >
          <CourseContent course={course} onSelectLesson={(lesson) => {
            setSelectedLesson(lesson);
            setShowContent(false); // auto-close dropdown on mobile
          }} />
        </div>

        {/* Lesson Viewer */}
        <div className="md:w-2/3">
          <LessonViewer lesson={selectedLesson} />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
