// src/pages/TakeCBT.jsx - FIXED VERSION
import React, { useEffect, useState } from "react";
import { useCbtstore } from "../../Store/cbtStore";
import { useAuthStore } from "../../Store/authStore";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
  Legend,
} from "recharts";

function TakeCBT() {
  const { user } = useAuthStore();
  const { getUserAttempts, getAttemptSummary, attempt, Summary, error, loading } = useCbtstore();
  const [activeTab, setActiveTab] = useState("attempts");

  useEffect(() => {
    if (user?._id) {
      console.log('Fetching data for user:', user._id);
      getUserAttempts(user._id);
      getAttemptSummary(user._id);
    }
  }, [user]);

  const COLORS = ["#0C6F89", "#E5E7EB"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Exam Dashboard</h2>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("attempts")}
          className={`px-4 py-2 font-medium ${
            activeTab === "attempts"
              ? "text-[#0C6F89] border-b-2 border-[#0C6F89]"
              : "text-gray-500"
          }`}
        >
          Exam Attempts
        </button>
        <button
          onClick={() => setActiveTab("analysis")}
          className={`px-4 py-2 font-medium ${
            activeTab === "analysis"
              ? "text-[#0C6F89] border-b-2 border-[#0C6F89]"
              : "text-gray-500"
          }`}
        >
          Performance Analysis
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="spinner-border text-[#0C6F89]" style={{ width: "3rem", height: "3rem" }}></div>
          <p className="text-gray-500 mt-2">Loading your data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* --- TAB 1: ATTEMPTS --- */}
      {activeTab === "attempts" && !loading && (
        <>
          {attempt && attempt.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {attempt.map((item, index) => {
                const percentage = item.percentage || 0;
                const chartData = [
                  { name: "Score", value: percentage },
                  { name: "Remaining", value: 100 - percentage },
                ];

                return (
                  <div
                    key={item._id || index}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between hover:shadow-md transition"
                  >
                    <div className="flex-1 mr-4">
                      <div className="flex justify-content-between items-center mb-2">
                        <h3 className="text-lg font-semibold capitalize text-gray-800">
                          {item.subject}
                        </h3>
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p>
                          <span className="font-medium">Exam:</span>{" "}
                          {(item.examName || item.exam)?.toUpperCase()}
                        </p>
                        <p>
                          <span className="font-medium">Year:</span> {item.year}
                        </p>
                        <p>
                          <span className="font-medium">Score:</span>{" "}
                          {item.score || item.correctAnswers}/{item.totalQuestions || item.maxScore}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          <span className={`font-semibold ${
                            (item.passed || percentage >= 50) ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {(item.passed || percentage >= 50) ? '✓ Passed' : '✗ Failed'}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.date || item.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <PieChart width={80} height={80}>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={28}
                          outerRadius={40}
                          startAngle={90}
                          endAngle={-270}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {chartData.map((entry, i) => (
                            <Cell
                              key={`cell-${i}`}
                              fill={i === 0 ? (percentage >= 50 ? '#0C6F89' : '#dc2626') : '#E5E7EB'}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                      <p className="text-sm text-gray-800 font-semibold mt-2">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="mt-4 text-lg font-medium text-gray-900">No exam attempts yet</h3>
              <p className="mt-2 text-sm text-gray-500">Get started by taking your first exam!</p>
              <a 
                href="/start_cbt"
                className="mt-4 inline-block px-6 py-2 bg-[#0C6F89] text-white rounded-lg hover:bg-[#0a5d73] transition"
              >
                Start First Exam
              </a>
            </div>
          )}
        </>
      )}

      {/* --- TAB 2: ANALYSIS --- */}
      {activeTab === "analysis" && !loading && (
        <>
          {Summary && Summary.totalAttempts > 0 ? (
            <div className="mt-4 space-y-6">
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                  📊 Overall Performance Overview
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Attempts</p>
                    <p className="text-2xl font-bold text-[#0C6F89]">
                      {Summary.totalAttempts || 0}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="text-2xl font-bold text-green-600">
                      {Summary.avgScore?.toFixed(1) || 0}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Average Accuracy</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {Summary.avgPercentage?.toFixed(1) || 0}%
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">Pass Rate</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {Summary.passRate?.toFixed(0) || 0}%
                    </p>
                  </div>
                </div>
              </div>

              {Summary.subjects && Summary.subjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">
                      📚 Performance by Subject
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={Summary.subjects}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="avgPercentage" fill="#0C6F89" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="mt-4 text-lg font-medium text-gray-900">No performance data yet</h3>
              <p className="mt-2 text-sm text-gray-500">Take some exams to see your analytics</p>
            </div>
          )}
        </>
      )}

      <a
        className="fixed bottom-6 right-6 px-6 py-3 rounded-full bg-[#0C6F89] text-white shadow-lg hover:bg-[#0a5d73] transition z-50"
        href="/start_cbt"
      >
        Start Exam
      </a>
    </div>
  );
}

export default TakeCBT;