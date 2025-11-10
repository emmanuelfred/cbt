import React, { useState, useEffect } from "react";
import jambLogo from "../assets/jamb.png";
import waecLogo from "../assets/waec.png";
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

  const { exams, getExams, loading } = useCbtstore();

  useEffect(() => {
    getExams();
  }, [getExams]);

  const handleStartExam = () => {
    if (!selectedExam || !selectedYearObj || !selectedSubject) {
      alert("Please select exam, year, and subject.");
      return;
    }

    // You can navigate or store this info
    console.log("Start Exam:", {
      exam: selectedExam.name,
      year: selectedYearObj.year,
      subject: selectedSubject,
      duration: selectedExam.time, // includes the exam time
    });
     navigate(`./${selectedExam.name}`, {
      state: {
       
        exam: selectedExam.name,
        year: selectedYearObj.year,
        subject: selectedSubject,
        duration:selectedExam.time,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#014925] font-semibold">
        Loading exams...
      </div>
    );
  }

  if (!exams || exams.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#014925] font-semibold">
        No available CBT exams at the moment.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
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
              alt={exam.name}
              className="w-16 h-16 mb-2 object-contain"
            />
            <span className="font-semibold capitalize">{exam.name}</span>
          </button>
        ))}
      </div>

      {/* Show exam time */}
      {selectedExam && (
        <div className="mb-4 text-center text-gray-700 font-medium">
          ⏱ Duration:{" "}
          <span className="text-[#014925] font-semibold">
            {selectedExam.time} minutes
          </span>
        </div>
      )}

      {/* Select Year */}
      {selectedExam && (
        <div className="mb-6 w-full max-w-2xl">
          <h3 className="font-semibold mb-2">Select Year:</h3>
          {selectedExam.years && selectedExam.years.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {selectedExam.years.map((yearObj) => (
                <button
                  key={yearObj._id}
                  className={`px-4 py-2 rounded-full border ${
                    selectedYearObj?._id === yearObj._id
                      ? "bg-[#0C6F89] text-white"
                      : "border-gray-300 text-gray-700"
                  } hover:bg-[#0C6F89] hover:text-white transition`}
                  onClick={() => {
                    setSelectedYearObj(yearObj);
                    setSelectedSubject(null);
                  }}
                >
                  {yearObj.year}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No available year for this exam.</p>
          )}
        </div>
      )}

      {/* Select Subject */}
      {selectedYearObj && (
        <div className="mb-6 w-full max-w-2xl">
          <h3 className="font-semibold mb-2">Select Subject:</h3>
          {selectedYearObj.subjects && selectedYearObj.subjects.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {selectedYearObj.subjects.map((subject, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-full border ${
                    selectedSubject === subject
                      ? "bg-[#0C6F89] text-white"
                      : "border-gray-300 text-gray-700"
                  } hover:bg-[#0C6F89] hover:text-white transition`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No subjects available for this year.
            </p>
          )}
        </div>
      )}

      {/* Start Exam */}
      <button
        onClick={handleStartExam}
        className="bg-[#0C6F89] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0a5d73] transition"
      >
        Start Exam
      </button>
    </div>
  );
};

export default StartCBT;
