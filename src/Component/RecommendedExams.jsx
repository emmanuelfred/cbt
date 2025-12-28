// src/components/RecommendedExams.jsx - FIXED VERSION
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCbtstore } from "../Store/cbtStore";

const RecommendedExams = ({ userId }) => {
  const navigate = useNavigate();
  const { exams, fetchRecommendations, loading, error } = useCbtstore();

  // Fetch recommended exams
  useEffect(() => {
    if (userId) {
      console.log('Fetching recommendations for user:', userId);
      fetchRecommendations(userId, 6); // fetch 6 recommended exams
    }
  }, [userId]);

  // Handle CBT Start
  const handleStartCBT = (recommendation) => {
    console.log('Starting exam:', recommendation);
    
    // Navigate with proper exam data
    navigate(`/start_cbt`, {
      state: {
        exam: recommendation.examName || recommendation.exam,
        examId: recommendation.examId || recommendation._id,
        year: recommendation.year,
        subject: recommendation.subject,
        duration: recommendation.duration || 120,
      },
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="spinner-border text-[#0C6F89]" style={{ width: "2rem", height: "2rem" }}></div>
        <p className="text-gray-500 mt-2">Loading recommendations...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
        <p className="text-sm">
          Unable to load recommendations. Try taking some exams first!
        </p>
      </div>
    );
  }

  // Empty state
  if (!exams || exams.length === 0) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
        <svg 
          className="mx-auto h-16 w-16 text-gray-400 mb-3" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No Recommendations Yet
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Take some CBTs to get personalized recommendations based on your performance!
        </p>
        <a
          href="/start_cbt"
          className="inline-block px-6 py-2 bg-[#0C6F89] text-white rounded-lg hover:bg-[#0a5d73] transition"
        >
          Start Your First Exam
        </a>
      </div>
    );
  }

  // Display recommended exams
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <svg 
          className="w-6 h-6 text-[#0C6F89]" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 10V3L4 14h7v7l9-11h-7z" 
          />
        </svg>
        Recommended for You
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {exams.map((rec, index) => {
          // Calculate recommendation score if available
          const score = rec.recommendationScore || rec.score || 0;
          const scoreColor = score >= 80 ? 'text-green-600' : 
                           score >= 60 ? 'text-yellow-600' : 
                           'text-orange-600';

          return (
            <div
              key={rec._id || index}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg capitalize text-gray-800">
                    {rec.subject}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      {rec.examName || rec.exam}
                    </span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      {rec.year}
                    </span>
                  </div>
                </div>
                
                {/* Recommendation Badge */}
                {rec.reason && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {rec.reason}
                  </span>
                )}
              </div>

              {/* Stats */}
              {rec.statistics && (
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-600">
                  <div>
                    <span className="text-gray-500">Questions:</span>
                    <span className="ml-1 font-medium">{rec.statistics.totalQuestions || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <span className="ml-1 font-medium">{rec.duration || rec.statistics.avgDuration || 120} min</span>
                  </div>
                </div>
              )}

              {/* Recommendation Score */}
              {score > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-gray-500">Match Score</span>
                    <span className={`font-semibold ${scoreColor}`}>{score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        score >= 80 ? 'bg-green-500' : 
                        score >= 60 ? 'bg-yellow-500' : 
                        'bg-orange-500'
                      }`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Start Button */}
              <button
                onClick={() => handleStartCBT(rec)}
                className="w-full py-2 rounded-lg bg-[#0C6F89] text-white text-sm font-medium hover:bg-[#0a5d73] transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                Start Exam
              </button>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      {exams.length >= 6 && (
        <div className="text-center">
          <a
            href="/start_cbt"
            className="inline-block text-[#0C6F89] hover:text-[#0a5d73] font-medium text-sm"
          >
            View All Exams →
          </a>
        </div>
      )}
    </div>
  );
};

export default RecommendedExams;