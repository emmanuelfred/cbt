import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCbtstore } from "../Store/cbtStore";

const RecommendedExams = ({ userId }) => {
  const navigate = useNavigate();

  const { exams, fetchRecommendations, loading } = useCbtstore();


  // Fetch recommended exams
  useEffect(() => {
    if (userId?._id) {
      fetchRecommendations(userId._id, 6); // fetch 4 recommended exams
    }
  }, [userId, fetchRecommendations]);

  // Handle CBT Start
  const handleStartCBT = (res) => {
    
    navigate(`/start_cbt/${res.exam}`, {
       state: {
       
        exam: res.exam,
        year: res.year,
        subject: res.subject,
        duration: res.duration || 60, 
      },
    });
  
  };

  // Loading state
  if (loading) {
    return <p className="text-center py-4">Loading recommendations...</p>;
  }

  // Empty state
  if (!exams || exams.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No recommendations found — try taking some CBTs to improve your results.
      </div>
    );
  }

  // Display recommended exams
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
      {exams.map((rec, index) => (
        <div
          key={index}
          className="cbt-card p-4 bg-white rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition"
        >
          <div>
            <h4 className="font-semibold text-lg capitalize text-gray-700">
              {rec.subject} {rec.year}
            </h4>
            <span className="text-sm text-gray-500 uppercase tracking-widest">
              {rec.exam}
            </span>
          </div>
          <button
            onClick={() => handleStartCBT(rec)}
            className="p-2 rounded-lg bg-[#0C6F89] text-white hover:bg-[#0f1d2d] transition"
          >
            Start Exam
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecommendedExams;
