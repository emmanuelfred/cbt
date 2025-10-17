import React from "react";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-600">
        <p className="text-lg mb-4">You are not logged in.</p>
        <Link
          to="/login"
          className="px-4 py-2 bg-[#15253a] text-white rounded-lg hover:bg-[#20537c] transition"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex flex-col items-center ">
      <div className="w-full max-w-md  shadow-md rounded-2xl p-6 border border-gray-200 bg-[#F8F9F5]">
        {/* Header */}
        <h2 className="text-2xl font-bold text-[#15253a] text-center mb-6">
          User Profile
        </h2>

        {/* User Info */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user?.profilePic || "https://randomuser.me/api/portraits/women/2.jpg"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-[#f4825d] mb-3"
            style={{ objectFit: "cover", maxWidth: "100%", objectPosition: "center" }}
          />
          <h3 className="text-lg font-semibold text-[#15253a]">{user?.name}</h3>
          <span className="text-gray-600">{user?.email}</span>
        </div>

        {/* Menu Links */}
        <ul className="space-y-3 text-gray-700">
          <li className="flex justify-between items-center border-b pb-2 ">
            <Link to="/classroom?page=edit-profile" className="text-[#f4825d] hover:text-[#20537c] no-underline">
              Edit Profile
            </Link>
            <span className="text-gray-400">{'>'}</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2">
            <Link to="/classroom?page=security" className="text-[#f4825d] hover:text-[#20537c] no-underline">
              Security
            </Link>
            <span className="text-gray-400">{'>'}</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2">
            <Link to="/newsletter" className="text-[#f4825d] hover:text-[#20537c] no-underline">
              Manage Newsletter
            </Link>
            <span className="text-gray-400">{'>'}</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2">
            <Link to="/chatbot" className="text-[#f4825d] hover:text-[#20537c] no-underline">
              Chatbot & Customer
            </Link>
            <span className="text-gray-400">{'>'}</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2">
            <Link to="/settings" className="text-[#f4825d] hover:text-[#20537c] no-underline">
              Settings
            </Link>
            <span className="text-gray-400">{'>'}</span>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full mt-6 bg-[#15253a] text-white py-2 rounded-xl font-medium hover:bg-[#20537c] transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
