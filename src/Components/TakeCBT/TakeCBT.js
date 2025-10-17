import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCbtstore } from "../../store/cbtStore";
import { useAuthStore } from "../../store/authStore";
import "./TakeCBT.css";

function TakeCBT() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { exams, getExams, loading } = useCbtstore();

  const [selectedExam, setSelectedExam] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [duration, setDuration] = useState("");

  useEffect(() => {
    getExams();
  }, [getExams]);

  const handleExamChange = (e) => {
    const examName = e.target.value;
    setSelectedExam(examName);
    setSelectedYear("");
    setSubjects([]);
    setSelectedSubjects([]);

    const exam = exams.find((ex) => ex.name?.toLowerCase() === examName.toLowerCase());
    if (exam) {
      setDuration(exam.time || "N/A");
    }
  };

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    setSelectedSubjects([]);

    const exam = exams.find((ex) => ex.name?.toLowerCase() === selectedExam.toLowerCase());
    if (exam) {
      const yearObj = exam.years?.find((y) => y.year === year);
      setSubjects(yearObj?.subjects || []);
    }
  };

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleStartCBT = () => {
    navigate("?page=cbt", {
      state: {
        user_id:user._id,
        avatar: user.profilePic,
        username: user.name,
        exam: selectedExam,
        year: selectedYear,
        subjects: selectedSubjects,
        duration,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 ml-4">Start CBT Exam</h2>

      <div className="w-full max-w-md shadow-md rounded-2xl p-6 border border-gray-200 bg-[#F8F9F5]">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={user.name} readOnly className="form-control" />
        </div>

        <div className="form-group mt-2">
          <label>Select Exam</label>
          <select value={selectedExam} onChange={handleExamChange} className="form-control">
            <option value="">-- Select Exam --</option>
            {exams.map((exam, idx) => (
              <option key={idx} value={exam.name || `exam-${idx}`}>
                {exam.name ? exam.name.toUpperCase() : `Exam ${idx + 1}`}
              </option>
            ))}
          </select>
        </div>

        {selectedExam && (
          <div className="form-group mt-2">
            <label>Select Year</label>
            <select value={selectedYear} onChange={handleYearChange} className="form-control">
              <option value="">-- Select Year --</option>
              {exams
                .find((ex) => ex.name?.toLowerCase() === selectedExam.toLowerCase())
                ?.years?.map((yearObj, idx) => (
                  <option key={idx} value={yearObj.year}>
                    {yearObj.year}
                  </option>
                ))}
            </select>
          </div>
        )}

        {subjects.length > 0 && (
          <div className="mt-3">
            <h5>Pick Subjects:</h5>
            {subjects.map((subj, idx) => (
              <div key={idx}>
                <label>
                  <input
                    type="checkbox"
                    value={subj}
                    checked={selectedSubjects.includes(subj)}
                    onChange={() => handleSubjectToggle(subj)}
                  />
                  {" "}{subj}
                </label>
              </div>
            ))}

            <p className="mt-2">
              <strong>Duration:</strong> {duration} mins
            </p>

            <div className="btn-container">
              <button
                disabled={selectedSubjects.length === 0}
                onClick={handleStartCBT}
                className="mt-3 px-4 py-2 bg-[#15253a] text-white rounded hover:bg-[#0f1d2d]"
              >
                Start CBT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TakeCBT;
