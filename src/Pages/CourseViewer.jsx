import React, { useEffect, useState } from "react";
import { FileText, PlayCircle, HelpCircle } from "lucide-react";
import { usecourseStore } from "../Store/courseStore";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const CourseViewer = () => {
  const { token } = useParams();
  const { getCourseCentent, course, loading } = usecourseStore();

  const [currentLesson, setCurrentLesson] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [enrollmentId, setEnrollmentId] = useState(null);

  // Load course data
  useEffect(() => {
    if (token) getCourseCentent(token);
  }, [token, getCourseCentent]);

  // When course data arrives
  useEffect(() => {
    if (course?.data?.sections?.length) {
      const { enrollment, sections } = course.data;
      setEnrollmentId(enrollment.id);

      // Resume from last progress
      const sectionIndex = enrollment.progress.section || 0;
      const materialIndex = enrollment.progress.material || 0;

      const currentSection = sections[sectionIndex];
      const currentContent = currentSection?.contents[materialIndex];

      if (currentContent) {
        setCurrentLesson({
          sectionIndex,
          materialIndex,
          type: currentContent.type,
          title: currentContent.title,
          src: currentContent.file_url || "",
          quiz: currentContent.quiz || [],
        });
      }
    }
  }, [course]);

  // Save progress when user changes lesson
  const handleSelectLesson = async (sectionIndex, materialIndex, content) => {
    setCurrentLesson({
      sectionIndex,
      materialIndex,
      type: content.type,
      title: content.title,
      src: content.file_url || "",
      quiz: content.quiz || [],
    });

    if (!enrollmentId) return;

    try {
      await axios.put(`http://localhost:5000/api/course/${enrollmentId}/progress`, {
        section: sectionIndex,
        material: materialIndex,
        complete: 0, // update later when they finish
      });
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  const handleQuizChange = (questionIndex, optionIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: optionIndex });
  };

  const renderLesson = () => {
    if (!currentLesson) return <p>Select a lesson to start learning.</p>;

    switch (currentLesson.type) {
      case "video":
        return (
          <video
            controls
            onEnded={() => handleCompleteLesson()}
            className="w-full rounded-xl shadow-md max-h-[70vh] bg-black"
            src={currentLesson.src}
          />
        );

      case "quiz":
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-[#014925] mb-6">
              {currentLesson.title}
            </h3>
            {currentLesson.quiz.map((q, i) => (
              <div key={i} className="mb-6">
                <p className="font-medium text-gray-800 mb-3">
                  {i + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, j) => (
                    <label
                      key={j}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value={j}
                        checked={quizAnswers[i] === j}
                        onChange={() => handleQuizChange(i, j)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => handleCompleteLesson()}
              className="mt-4 bg-[#0C6F89] text-white px-6 py-2 rounded-full hover:bg-[#026d36] transition"
            >
              Submit Quiz
            </button>
          </div>
        );

      default:
        return <p>Select a lesson to start learning.</p>;
    }
  };

  const handleCompleteLesson = async () => {
    if (!enrollmentId || !currentLesson) return;
    try {
      await axios.put(`${API_URL}/api/enrollments/${enrollmentId}/progress`, {
        section: currentLesson.sectionIndex,
        material: currentLesson.materialIndex,
        complete: 1,
      });
    } catch (err) {
      console.error("Error marking lesson complete:", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading course...</p>;

  const courseData = course?.data;
  if (!courseData) return <p className="text-center py-10">No course found.</p>;

  return (
    <div className="flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-[#014925] mb-4">
          {courseData.course.course_title}
        </h1>
        {renderLesson()}
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-white border-l border-gray-200 p-4 overflow-hidden overflow-y-scroll rounded-lg">
        <h3 className="text-xl font-semibold text-[#014925] mb-4">
          Course Content
        </h3>
        {courseData.sections.map((section, sIndex) => (
          <div key={section._id} className="mb-6">
            <h4 className="font-medium text-gray-800 mb-3">{section.title}</h4>
            <ul className="space-y-2">
              {section.contents.map((content, mIndex) => (
                <li
                  key={content._id}
                  onClick={() => handleSelectLesson(sIndex, mIndex, content)}
                  className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition ${
                    currentLesson?.title === content.title
                      ? "bg-[#0C6F89]/10 text-[#014925] font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {content.type === "video" && <PlayCircle size={18} />}
                  {content.type === "pdf" && <FileText size={18} />}
                  {content.type === "quiz" && <HelpCircle size={18} />}
                  <span>{content.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default CourseViewer;
