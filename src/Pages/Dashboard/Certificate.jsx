// src/pages/Certificate.jsx - Certificate Display & Download
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaDownload, FaShare, FaCertificate, FaTrophy } from "react-icons/fa";
import toast from "react-hot-toast";
import { useCourseStore } from "../../Store/courseStore";
import { useAuthStore } from "../../Store/authStore";

const Certificate = () => {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { certificate, generateCertificate, loading } = useCourseStore();
  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to view certificate");
      navigate("/login");
      return;
    }

    loadCertificate();
  }, [enrollmentId]);

  const loadCertificate = async () => {
    try {
      const cert = await generateCertificate(enrollmentId);
      setCertificateData(cert);
    } catch (error) {
      console.error("Failed to load certificate:", error);
      toast.error("Failed to load certificate");
    }
  };

  const handleDownload = () => {
    // In real implementation, this would generate a PDF
    toast.success("Certificate download started!");
    // You can implement actual PDF generation using libraries like jsPDF or html2canvas
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/certificate/${certificate?.certificate_number}`;
    
    if (navigator.share) {
      navigator.share({
        title: "My Course Certificate",
        text: `I completed ${certificateData?.course_title}!`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Certificate link copied to clipboard!");
    }
  };

  if (loading || !certificateData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-[#0C6F89]" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-100 p-4 rounded-full mb-4">
            <FaTrophy className="text-6xl text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-[#014925] mb-2">
            Congratulations! 🎉
          </h1>
          <p className="text-gray-600 text-lg">
            You've successfully completed the course
          </p>
        </div>

        {/* Certificate Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          {/* Certificate Design */}
          <div className="border-8 border-double border-[#0C6F89] p-8 relative">
            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 text-6xl text-[#0C6F89] opacity-10">
              ❋
            </div>
            <div className="absolute top-4 right-4 text-6xl text-[#0C6F89] opacity-10">
              ❋
            </div>
            <div className="absolute bottom-4 left-4 text-6xl text-[#0C6F89] opacity-10">
              ❋
            </div>
            <div className="absolute bottom-4 right-4 text-6xl text-[#0C6F89] opacity-10">
              ❋
            </div>

            {/* Certificate Content */}
            <div className="text-center relative z-10">
              <div className="mb-6">
                <FaCertificate className="text-6xl text-[#0C6F89] mx-auto mb-4" />
                <h2 className="text-3xl font-serif font-bold text-[#014925] mb-2">
                  Certificate of Completion
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-[#0C6F89] to-[#014925] mx-auto"></div>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                This is to certify that
              </p>

              <h3 className="text-4xl font-serif font-bold text-[#014925] mb-6">
                {certificateData.student_name}
              </h3>

              <p className="text-lg text-gray-700 mb-6">
                has successfully completed the course
              </p>

              <h4 className="text-2xl font-semibold text-[#0C6F89] mb-8">
                {certificateData.course_title}
              </h4>

              <div className="flex justify-between items-end mt-12 pt-8 border-t-2 border-gray-200">
                <div className="text-left">
                  <div className="w-48 border-b-2 border-[#014925] mb-2"></div>
                  <p className="text-sm text-gray-600">Instructor Signature</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {certificateData.instructor_name}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">Completion Date</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {new Date(certificateData.issued_on).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">Certificate Number</p>
                  <p className="text-sm font-semibold text-gray-800 font-mono">
                    {certificateData.certificate_number}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-[#0C6F89] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#014925] transition shadow-lg"
          >
            <FaDownload /> Download Certificate
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition shadow-lg"
          >
            <FaShare /> Share Certificate
          </button>

          <button
            onClick={() => navigate("/my-courses")}
            className="flex items-center gap-2 border-2 border-[#0C6F89] text-[#0C6F89] px-8 py-3 rounded-full font-semibold hover:bg-[#0C6F89] hover:text-white transition"
          >
            Back to My Courses
          </button>
        </div>

        {/* Verification Info */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Certificate Verification
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            This certificate can be verified at:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code className="text-sm text-[#0C6F89] break-all">
              {window.location.origin}/verify/{certificateData.certificate_number}
            </code>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-2xl font-bold text-[#014925]">
              {certificateData.sections_completed || 0}
            </p>
            <p className="text-sm text-gray-600">Sections Completed</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <p className="text-2xl font-bold text-[#0C6F89]">
              {certificateData.total_time_spent || 0}h
            </p>
            <p className="text-sm text-gray-600">Time Invested</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-2xl font-bold text-green-600">
              {certificateData.final_score || 100}%
            </p>
            <p className="text-sm text-gray-600">Final Score</p>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Share your achievement on social media!</p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              Share on Facebook
            </button>
            <button className="bg-blue-400 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition">
              Share on Twitter
            </button>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition">
              Share on LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;