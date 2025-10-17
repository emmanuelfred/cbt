import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCbtstore } from "../store/cbtStore";

const RecommendedExams = ({ userId }) => {
  const navigate = useNavigate();

  const { exams, fetchRecommendations, loading } = useCbtstore();


  // Fetch recommended exams
  useEffect(() => {
    if (userId?._id) {
      fetchRecommendations(userId._id, 4); // fetch 4 recommended exams
    }
  }, [userId, fetchRecommendations]);

  // Handle CBT Start
  const handleStartCBT = (res) => {
    
    navigate("?page=cbt", {
      state: {
        user_id:userId._id,
        username: userId.name,
        avatar: userId.profilePic,
        exam: res.exam,
        year: res.year,
        subjects: [res.subject],
        duration: res.duration || 60, // default to 60 minutes if not provided
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mb-6">
      {exams.map((rec, index) => (
        <div
          key={index}
          className="cbt-card p-4 bg-[#F8F9F5] rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition"
        >
          <div>
            <h4 className="font-semibold text-lg capitalize">
              {rec.subject} {rec.year}
            </h4>
            <span className="text-sm text-gray-600 uppercase tracking-widest">
              {rec.exam}
            </span>
          </div>
          <button
            onClick={() => handleStartCBT(rec)}
            className="p-2 rounded-lg bg-[#15253a] text-white hover:bg-[#0f1d2d] transition"
          >
            Start Exam
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecommendedExams;
