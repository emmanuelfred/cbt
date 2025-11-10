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

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* --- TAB 1: ATTEMPTS --- */}
      {activeTab === "attempts" && (
        <>
          {attempt && attempt.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 space-y-4">
              {attempt.map((item, index) => {
                const chartData = [
                  { name: "Score", value: item.percentage },
                  { name: "Remaining", value: 100 - item.percentage },
                ];
                return (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between"
                  >
                    {/* Left: Info */}
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold capitalize text-gray-800">
                          {item.subject}
                        </h3>
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p>
                          <span className="font-medium">Exam:</span>{" "}
                          {item.exam.toUpperCase()}
                        </p>
                        <p>
                          <span className="font-medium">Year:</span> {item.year}
                        </p>
                        <p>
                          <span className="font-medium">Score:</span> {item.score}
                        </p>
                        <p>
                          <span className="font-medium">Duration:</span>{" "}
                          {item.duration} min
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Right: Percentage Chart */}
                    <div className="flex flex-col items-center">
                      <PieChart width={70} height={70}>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={35}
                          startAngle={90}
                          endAngle={-270}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {chartData.map((entry, i) => (
                            <Cell
                              key={`cell-${i}`}
                              fill={COLORS[i % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                      <p className="text-xs text-gray-600 font-medium mt-[10px]">
                        {item.percentage}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            !loading && <p className="text-gray-500 mt-4">No exam attempts found yet.</p>
          )}
        </>
      )}

   {activeTab === "analysis" && Summary && (
  <div className="mt-4 space-y-6">
    {/* Friendly Overview */}
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Overall Performance Overview 
      </h3>

      <p className="text-gray-600 mb-4 text-sm md:text-base">
        Here’s a quick look at your progress so far. Remember, learning is a
        journey — every attempt is a step forward. Keep going! 
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Total Attempts</p>
          <p className="text-xl font-semibold text-[#0C6F89]">
            {Summary.totalAttempts}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-xl font-semibold text-[#0C6F89]">
            {Summary.avgScore}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average Accuracy</p>
          <p className="text-xl font-semibold text-[#0C6F89]">
            {Summary.avgPercentage}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average Time</p>
          <p className="text-xl font-semibold text-[#0C6F89]">
            {Summary.avgDuration} min
          </p>
        </div>
      </div>

      {/* Encouraging Message */}
      <p className="text-sm mt-4 text-gray-700 italic">
        {
          Summary.improvement === "improving"
            ? "🌟 Great job! You’re improving with each attempt — keep the momentum going!"
            : Summary.improvement === "declining"
            ? "💪 Don’t be discouraged. Every great learner has off days — keep practicing!"
            : "📘 You’re staying consistent. Try reviewing past questions to boost your progress."
        }
      </p>
    </div>

    {/* Simple & Clear Charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bar Chart - Avg Score per Subject */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3">
          Average Performance by Subject 📚
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={Summary.subjects}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "none",
              }}
            />
            <Bar dataKey="avgPercentage" fill="#0C6F89" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Each bar shows your average accuracy for that subject.
        </p>
      </div>

      {/* Pie Chart - Time Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3">
          Time Spent on Exams ⏱️
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={Summary.subjects.map((s) => ({
                name: s.subject,
                value: parseFloat(s.avgDuration),
              }))}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#0C6F89"
              dataKey="value"
              label={(entry) => entry.name}
            >
              {Summary.subjects.map((_, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={["#0C6F89", "#89CFF0", "#E1E5FF", "#C6DCE4"][i % 4]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-500 mt-2 text-center">
          See how much time you typically spend per subject.
        </p>
      </div>
    </div>
  </div>
)}


      {/* Start Exam Button */}
      <a
        className="p-3 rounded-lg bg-[#0C6F89] text-white hover:bg-[#0f1d2d] transition fixed bottom-5 left-5 md:left-80"
        href="/start_cbt"
      >
        Start Exam
      </a>
    </div>
  );
}

export default TakeCBT;
