// src/pages/Profile/ChangeCredentials.jsx
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChangeCredentials = () => {
  const {
    user,
    updateEmail,
    updatePassword,
    verifyEmail,
    isLoading,
    message,
    logout,
  } = useAuthStore();
  const navigate = useNavigate();

  const [otpForm, setOtpForm] = useState(false);
  const [otp, setOtp] = useState("");

  const [emailForm, setEmailForm] = useState({
    newEmail: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // === Handle email form change ===
  const handleEmailChange = (e) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
  };

  // === Handle password form change ===
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // === Submit Email Update ===
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!emailForm.newEmail.includes("@")) {
      alert("Enter a valid email address.");
      return;
    }

    try {
        const userId = user?._id;
      const data = {userId, newEmail: emailForm.newEmail };
      await updateEmail(data);
      navigate("/verify-email");
      logout();
      
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update email.");
    }
  };

  // === Submit Password Update ===
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword.trim()) {
      alert("Enter your current password.");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
        const userId = user?._id; // Ensure userId is defined
      const data = {userId, currentPassword, newPassword };
      await updatePassword(data);
      alert("Password updated successfully.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update password.");
    }
  };

  // === Handle OTP Verification ===
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      alert("Enter the OTP sent to your email.");
      return;
    }

    try {
      await verifyEmail(otp);
      alert("Email verified successfully!");
      setOtpForm(false);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4">Account Settings</h3>

      {/* === Change Email Form === */}
      <div className="card p-4 mb-4 shadow-sm bg-[#F8F9F5]">
        <h5 className="mb-3 text-center">Change Email</h5>
        {!otpForm ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-3">
              <label className="form-label">Current Email</label>
              <input
                type="email"
                className="form-control"
                value={user?.email || ""}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Email</label>
              <input
                type="email"
                className="form-control"
                name="newEmail"
                value={emailForm.newEmail}
                onChange={handleEmailChange}
                placeholder="Enter new email address"
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              disabled={isLoading}
              style={{ backgroundColor: "#15253a", color: "#fff" }}
            >
              {isLoading ? <Spinner size="sm" /> : "Update Email"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-3">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP sent to your new email"
              />
            </div>
            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: "#15253a", color: "#fff" }}
            >
              {isLoading ? <Spinner size="sm" /> : "Verify Email"}
            </button>
          </form>
        )}
      </div>

      {/* === Change Password Form === */}
      <div className="card p-4 shadow-sm bg-[#F8F9F5]">
        <h5 className="mb-3 text-center">Change Password</h5>
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            disabled={isLoading}
            style={{ backgroundColor: "#15253a", color: "#fff" }}
          >
            {isLoading ? <Spinner size="sm" /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeCredentials;
