// src/pages/StartCBT.jsx (UPDATED for new exam structure)
import React, { useState, useEffect } from "react";
import jambLogo from "../assets/jamb.png";
import waecLogo from "../assets/WAEC.png";
import necoLogo from "../assets/neco.png";
import { useCbtstore } from "../Store/cbtStore";
import { useNavigate } from "react-router-dom";

const examLogos = {
  jamb: jambLogo,
  waec: waecLogo,
  neco: necoLogo,
  "junior waec": waecLogo,
  "junior neco": necoLogo,
};

const StartCBT = () => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedYearObj, setSelectedYearObj] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const navigate = useNavigate();

  const { exams, getExams, loading, error } = useCbtstore();

  useEffect(() => {
    getExams();
  }, []);

  const handleStartExam = () => {
    if (!selectedExam || !selectedYearObj || !selectedSubject) {
      alert("Please select exam, year, and subject.");
      return;
    }

    // Navigate to exam with updated structure
    navigate(`./${selectedExam.name}`, {
      state: {
        exam: selectedExam.name,
        year: selectedYearObj.year,
        subject: selectedSubject,
        duration: selectedExam.defaultTotalTime || 120, // Use defaultTotalTime from new structure
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#014925] font-semibold">
        <div className="text-center">
          <div className="spinner-border mb-3" style={{ width: "3rem", height: "3rem" }}></div>
          <p>Loading exams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={() => getExams()}
            className="bg-[#0C6F89] text-white px-6 py-2 rounded-lg hover:bg-[#0a5d73] transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!exams || exams.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <svg
            className="mx-auto mb-4 w-20 h-20 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-600 font-semibold text-lg">
            No available CBT exams at the moment.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Check back later for new exams
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center" style={{ paddingTop: "100px" }}>
      <h2 className="text-3xl font-bold text-[#014925] mb-6">Start CBT</h2>

      {/* Select Exam */}
      <div className="mb-6 w-full max-w-3xl grid grid-cols-2 md:grid-cols-3 gap-4">
        {exams.map((exam) => (
          <button
            key={exam._id}
            className={`flex flex-col items-center p-4 border rounded-lg shadow-md hover:shadow-xl transition ${
              selectedExam?._id === exam._id
                ? "border-[#0C6F89] bg-[#0c70891c]"
                : "border-gray-300"
            }`}
            onClick={() => {
              setSelectedExam(exam);
              setSelectedYearObj(null);
              setSelectedSubject(null);
            }}
          >
            <img
              src={examLogos[exam.name.toLowerCase()] || jambLogo}
              alt={exam.displayName}
              className="w-16 h-16 mb-2 object-contain"
            />
            <span className="font-semibold capitalize">{exam.displayName}</span>
            <small className="text-gray-500 text-xs mt-1">{exam.category}</small>
          </button>
        ))}
      </div>

      {/* Show exam details */}
      {selectedExam && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md w-full max-w-2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="text-lg font-semibold text-[#014925]">
                {selectedExam.defaultTotalTime} mins
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time per Question</p>
              <p className="text-lg font-semibold text-[#014925]">
                {selectedExam.defaultTimePerQuestion}s
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pass Mark</p>
              <p className="text-lg font-semibold text-[#014925]">
                {selectedExam.passingPercentage}%
              </p>
            </div>
          </div>
          
          {selectedExam.description && (
            <p className="text-sm text-gray-600 mt-3 text-center">
              {selectedExam.description}
            </p>
          )}
        </div>
      )}

      {/* Select Year */}
      {selectedExam && (
        <div className="mb-6 w-full max-w-2xl">
          <h3 className="font-semibold mb-2 text-[#014925]">Select Year:</h3>
          {selectedExam.years && selectedExam.years.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {selectedExam.years.map((yearObj) => (
                <button
                  key={yearObj._id || yearObj.year}
                  className={`px-4 py-2 rounded-full border ${
                    selectedYearObj?.year === yearObj.year
                      ? "bg-[#0C6F89] text-white"
                      : "border-gray-300 text-gray-700"
                  } hover:bg-[#0C6F89] hover:text-white transition`}
                  onClick={() => {
                    setSelectedYearObj(yearObj);
                    setSelectedSubject(null);
                  }}
                >
                  {yearObj.year}
                  {yearObj.subjects && yearObj.subjects.length > 0 && (
                    <span className="ml-2 text-xs opacity-75">
                      ({yearObj.subjects.length} subjects)
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No available years for this exam.</p>
              <small className="text-gray-400">Contact admin to add years</small>
            </div>
          )}
        </div>
      )}

      {/* Select Subject */}
      {selectedYearObj && (
        <div className="mb-6 w-full max-w-2xl">
          <h3 className="font-semibold mb-2 text-[#014925]">Select Subject:</h3>
          {selectedYearObj.subjects && selectedYearObj.subjects.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {selectedYearObj.subjects.map((subjectObj, i) => {
                // Handle both string subjects and object subjects
                const subjectName = typeof subjectObj === 'string' 
                  ? subjectObj 
                  : subjectObj.name;
                const questionCount = typeof subjectObj === 'object' 
                  ? subjectObj.questionCount 
                  : null;

                return (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-full border ${
                      selectedSubject === subjectName
                        ? "bg-[#0C6F89] text-white"
                        : "border-gray-300 text-gray-700"
                    } hover:bg-[#0C6F89] hover:text-white transition`}
                    onClick={() => setSelectedSubject(subjectName)}
                  >
                    {subjectName}
                    {questionCount > 0 && (
                      <span className="ml-2 text-xs opacity-75">
                        ({questionCount} Qs)
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No subjects available for this year.</p>
              <small className="text-gray-400">Contact admin to add subjects</small>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      {selectedExam && selectedExam.instructions && (
        <div className="mb-6 w-full max-w-2xl p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-[#014925] mb-2">📋 Instructions:</h4>
          <p className="text-gray-700 text-sm whitespace-pre-line">
            {selectedExam.instructions}
          </p>
        </div>
      )}

      {/* Start Exam Button */}
      <button
        onClick={handleStartExam}
        disabled={!selectedExam || !selectedYearObj || !selectedSubject}
        className={`px-8 py-3 rounded-full font-semibold text-white transition ${
          selectedExam && selectedYearObj && selectedSubject
            ? "bg-[#0C6F89] hover:bg-[#0a5d73] cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {selectedExam && selectedYearObj && selectedSubject
          ? "Start Exam"
          : "Select Exam, Year & Subject"}
      </button>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && selectedExam && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg w-full max-w-2xl">
          <h4 className="font-semibold mb-2">Debug Info:</h4>
          <pre className="text-xs overflow-auto">
            {JSON.stringify({
              examName: selectedExam.name,
              year: selectedYearObj?.year,
              subject: selectedSubject,
              duration: selectedExam.defaultTotalTime
            }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default StartCBT;