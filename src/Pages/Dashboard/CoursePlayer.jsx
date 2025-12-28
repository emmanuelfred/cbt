// src/pages/CoursePlayer.jsx - Full Course Content Viewer
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { 
  FaPlay, 
  FaPause, 
  FaForward, 
  FaBackward,
  FaCheckCircle,
  FaQuestionCircle,
  FaStickyNote,
  FaBookmark,
  FaChevronLeft,
  FaChevronRight,
  FaTrophy
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthStore } from "../../Store/authStore";
import { useCourseStore } from "../../Store/courseStore";

const CoursePlayer = () => {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const {
    course,
    currentEnrollment,
    sectionQuestions,
    getCourseContent,
    updateProgress,
    markSectionComplete,
    askQuestion,
    getSectionQuestions,
    addNote,
    addBookmark,
    generateCertificate,
    loading,
  } = useCourseStore();

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showQA, setShowQA] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [noteText, setNoteText] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to access this course");
      navigate("/login");
      return;
    }

    loadCourseContent();
  }, [enrollmentId]);

  useEffect(() => {
    if (course?.sections?.[currentSectionIndex]) {
      loadSectionQuestions(course.sections[currentSectionIndex]._id);
    }
  }, [currentSectionIndex]);

  const loadCourseContent = async () => {
    try {
      // Assuming you have enrollment token stored
      const token = localStorage.getItem(`enrollment_${enrollmentId}`);
      if (token) {
        await getCourseContent(token);
      }
    } catch (error) {
      console.error("Failed to load course:", error);
      toast.error("Failed to load course content");
    }
  };

  const loadSectionQuestions = async (sectionId) => {
    try {
      await getSectionQuestions(sectionId);
    } catch (error) {
      console.error("Failed to load questions:", error);
    }
  };

  const handleProgressUpdate = async (contentType, completed = false) => {
    try {
      await updateProgress({
        enrollmentId,
        sectionId: course.sections[currentSectionIndex]._id,
        contentIndex: currentContentIndex,
        completed,
        timeSpent: 0,
        contentType,
        contentTitle: currentContent.title,
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleMarkComplete = async () => {
    try {
      await markSectionComplete(
        course.sections[currentSectionIndex]._id,
        enrollmentId
      );
      toast.success("✅ Section marked as complete!");
      
      // Move to next section
      if (currentSectionIndex < course.sections.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
        setCurrentContentIndex(0);
      } else {
        // Course completed
        toast.success("🎉 Congratulations! You've completed the course!");
        handleGenerateCertificate();
      }
    } catch (error) {
      toast.error("Failed to mark section complete");
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      await generateCertificate(enrollmentId);
      toast.success("🏆 Certificate generated!");
      navigate(`/certificate/${enrollmentId}`);
    } catch (error) {
      console.error("Failed to generate certificate:", error);
    }
  };

  const handleAskQuestion = async () => {
    if (!questionText.trim()) {
      toast.error("Please enter a question");
      return;
    }

    try {
      await askQuestion(course.sections[currentSectionIndex]._id, {
        userId: user._id,
        userName: user.name || user.email,
        userAvatar: user.avatar || "",
        question: questionText,
        questionHtml: questionText,
        videoTimestamp: videoProgress,
      });
      
      toast.success("✅ Question posted!");
      setQuestionText("");
      loadSectionQuestions(course.sections[currentSectionIndex]._id);
    } catch (error) {
      toast.error("Failed to post question");
    }
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) {
      toast.error("Please enter a note");
      return;
    }

    try {
      await addNote(enrollmentId, {
        sectionId: course.sections[currentSectionIndex]._id,
        contentIndex: currentContentIndex,
        videoTimestamp: videoProgress,
        note: noteText,
      });
      
      toast.success("📝 Note saved!");
      setNoteText("");
    } catch (error) {
      toast.error("Failed to save note");
    }
  };

  const handleAddBookmark = async () => {
    try {
      await addBookmark(enrollmentId, {
        sectionId: course.sections[currentSectionIndex]._id,
        contentIndex: currentContentIndex,
        videoTimestamp: videoProgress,
        title: `${currentContent.title} - ${videoProgress}s`,
      });
      
      toast.success("🔖 Bookmark added!");
    } catch (error) {
      toast.error("Failed to add bookmark");
    }
  };

  const handleQuizSubmit = () => {
    const quiz = currentContent.quiz;
    let correct = 0;
    
    quiz.questions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct_answer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / quiz.questions.length) * 100);
    setQuizScore(score);
    
    handleProgressUpdate("quiz", score >= 70);
    
    if (score >= 70) {
      toast.success(`✅ Passed! Score: ${score}%`);
    } else {
      toast.error(`❌ Failed. Score: ${score}%. Try again!`);
    }
  };

  const handleNextContent = () => {
    const section = course.sections[currentSectionIndex];
    
    if (currentContentIndex < section.contents.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
      setQuizScore(null);
      setQuizAnswers({});
    } else if (currentSectionIndex < course.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentContentIndex(0);
      setQuizScore(null);
      setQuizAnswers({});
    }
  };

  const handlePreviousContent = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
      setQuizScore(null);
      setQuizAnswers({});
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      const prevSection = course.sections[currentSectionIndex - 1];
      setCurrentContentIndex(prevSection.contents.length - 1);
      setQuizScore(null);
      setQuizAnswers({});
    }
  };

  if (loading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-[#0C6F89]" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  const currentSection = course.sections[currentSectionIndex];
  const currentContent = currentSection?.contents[currentContentIndex];

  if (!currentSection || !currentContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Course content not available</p>
          <button
            onClick={() => navigate("/my-courses")}
            className="mt-4 bg-[#0C6F89] text-white px-6 py-2 rounded-full"
          >
            Back to My Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-80 bg-white shadow-lg overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="font-bold text-lg text-[#014925] mb-2">
              {course.course_title}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#0C6F89] h-2 rounded-full"
                style={{ width: `${currentEnrollment?.overall_progress || 0}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {currentEnrollment?.overall_progress || 0}% Complete
            </p>
          </div>

          <div className="p-4">
            {course.sections.map((section, sIndex) => (
              <div key={section._id} className="mb-4">
                <h3 className="font-semibold text-sm text-gray-800 mb-2">
                  Section {sIndex + 1}: {section.title}
                </h3>
                <div className="space-y-1">
                  {section.contents.map((content, cIndex) => (
                    <button
                      key={cIndex}
                      onClick={() => {
                        setCurrentSectionIndex(sIndex);
                        setCurrentContentIndex(cIndex);
                        setQuizScore(null);
                        setQuizAnswers({});
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                        sIndex === currentSectionIndex && cIndex === currentContentIndex
                          ? "bg-[#0C6F89] text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {content.type === "video" && <FaPlay className="text-xs" />}
                        {content.type === "pdf" && "📄"}
                        {content.type === "quiz" && "❓"}
                        <span className="truncate">{content.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-[#0C6F89] hover:text-[#014925]"
          >
            {showSidebar ? "◀ Hide" : "▶ Show"} Sections
          </button>
          
          <h1 className="text-xl font-bold text-[#014925]">
            {currentContent.title}
          </h1>

          <button
            onClick={() => navigate("/my-courses")}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕ Exit
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Video Content */}
          {currentContent.type === "video" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-black rounded-lg overflow-hidden mb-4">
                <video
                  controls
                  className="w-full"
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                  onTimeUpdate={(e) => setVideoProgress(Math.floor(e.target.currentTime))}
                  onEnded={() => handleProgressUpdate("video", true)}
                >
                  <source src={currentContent.video_url} type="video/mp4" />
                </video>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <h2 className="text-2xl font-bold text-[#014925] mb-2">
                  {currentContent.title}
                </h2>
                {currentContent.description && (
                  <p className="text-gray-700">{currentContent.description}</p>
                )}
              </div>
            </div>
          )}

          {/* PDF Content */}
          {currentContent.type === "pdf" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#014925] mb-4">
                  {currentContent.title}
                </h2>
                <iframe
                  src={currentContent.pdf_url}
                  className="w-full h-screen border rounded"
                  title={currentContent.title}
                />
              </div>
            </div>
          )}

          {/* Quiz Content */}
          {currentContent.type === "quiz" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#014925] mb-6">
                  {currentContent.title}
                </h2>

                {quizScore === null ? (
                  <div className="space-y-6">
                    {currentContent.quiz.questions.map((question, qIndex) => (
                      <div key={qIndex} className="border-b pb-6">
                        <p className="font-semibold text-lg mb-4">
                          {qIndex + 1}. {question.question}
                        </p>
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <label
                              key={oIndex}
                              className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name={`question-${qIndex}`}
                                value={oIndex}
                                checked={quizAnswers[qIndex] === oIndex}
                                onChange={() =>
                                  setQuizAnswers({ ...quizAnswers, [qIndex]: oIndex })
                                }
                                className="w-4 h-4"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={handleQuizSubmit}
                      className="bg-[#0C6F89] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#014925] transition"
                    >
                      Submit Quiz
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className={`text-6xl mb-4 ${quizScore >= 70 ? "text-green-500" : "text-red-500"}`}>
                      {quizScore >= 70 ? "✅" : "❌"}
                    </div>
                    <h3 className="text-3xl font-bold mb-2">
                      Score: {quizScore}%
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {quizScore >= 70
                        ? "Great job! You passed the quiz!"
                        : "Keep studying and try again!"}
                    </p>
                    {quizScore < 70 && (
                      <button
                        onClick={() => {
                          setQuizScore(null);
                          setQuizAnswers({});
                        }}
                        className="bg-[#0C6F89] text-white px-6 py-2 rounded-full hover:bg-[#014925]"
                      >
                        Retry Quiz
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Text Content */}
          {currentContent.type === "text" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#014925] mb-4">
                  {currentContent.title}
                </h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentContent.text_content }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="max-w-4xl mx-auto mt-6 flex gap-3">
            <button
              onClick={handleAddBookmark}
              className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600"
            >
              <FaBookmark /> Bookmark
            </button>
            
            <button
              onClick={() => setShowQA(!showQA)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              <FaQuestionCircle /> Q&A
            </button>

            <button
              onClick={handleMarkComplete}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 ml-auto"
            >
              <FaCheckCircle /> Mark Section Complete
            </button>
          </div>

          {/* Q&A Section */}
          {showQA && (
            <div className="max-w-4xl mx-auto mt-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Questions & Answers</h3>
                
                <div className="mb-6">
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full border rounded-lg p-3 mb-2"
                    rows="3"
                  />
                  <button
                    onClick={handleAskQuestion}
                    className="bg-[#0C6F89] text-white px-6 py-2 rounded-full hover:bg-[#014925]"
                  >
                    Post Question
                  </button>
                </div>

                <div className="space-y-4">
                  {sectionQuestions.length === 0 ? (
                    <p className="text-gray-500">No questions yet. Be the first to ask!</p>
                  ) : (
                    sectionQuestions.map((q) => (
                      <div key={q._id} className="border-b pb-4">
                        <p className="font-semibold mb-1">{q.userName}</p>
                        <p className="text-gray-700 mb-2">{q.question}</p>
                        {q.replies?.map((reply, idx) => (
                          <div key={idx} className="ml-6 mt-2 p-3 bg-gray-50 rounded">
                            <p className="font-semibold text-sm">{reply.userName}</p>
                            <p className="text-sm">{reply.reply}</p>
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="bg-white border-t p-4 flex items-center justify-between">
          <button
            onClick={handlePreviousContent}
            disabled={currentSectionIndex === 0 && currentContentIndex === 0}
            className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft /> Previous
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Section {currentSectionIndex + 1} of {course.sections.length}
            </p>
            <p className="text-xs text-gray-500">
              Content {currentContentIndex + 1} of {currentSection.contents.length}
            </p>
          </div>

          <button
            onClick={handleNextContent}
            disabled={
              currentSectionIndex === course.sections.length - 1 &&
              currentContentIndex === currentSection.contents.length - 1
            }
            className="flex items-center gap-2 px-6 py-2 bg-[#0C6F89] text-white rounded-full hover:bg-[#014925] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;