import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPen,
  FaBook,
  FaComments,
  FaUser,
  FaMoneyBill,
  FaSignOutAlt,
  FaBell,
  FaCog,
} from "react-icons/fa";
import { useAuthStore } from "../../Store/authStore";
import "./ProfileDropdown.css";

function ProfileDropdown() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Dashboard-style menu items
  const menuItems = [
    { path: "/dashboard", label: "Track Progress", icon: <FaHome /> },
    { path: "/dashboard/cbt", label: "Take CBT", icon: <FaPen /> },
   /* { path: "/dashboard/register", label: "Register Course", icon: <FaBook /> },
    { path: "/dashboard/active", label: "Active Courses", icon: <FaBook /> },
    { path: "/dashboard/chat", label: "Chat Room", icon: <FaComments /> },
     { path: "/dashboard/payment", label: "Payment & Subscription", icon: <FaMoneyBill /> },
    { path: "/dashboard/settings", label: "Settings", icon: <FaCog /> },*/
    { path: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
   
  ];

  return (
    <div className="relative" ref={dropdownRef} style={{ width: "100%" }}>
      {isAuthenticated ? (
        <>
          {/* Dropdown Toggle */}
          <button
            className="flex justify-end items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition"
            id="profile-dropdown-button"
          >
            <img
              src={
                user?.profilePic ||
                "https://randomuser.me/api/portraits/men/1.jpg"
              }
              alt="User Profile"
              className="w-9 h-9 rounded-full object-cover"
              onClick={toggleDropdown}
            />
           
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 transition-all"
              id="profile-dropdown"
            >
              <div className="p-3">
                <div className="flex flex-col space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition text-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-[#0C6F89]">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 text-red-600 rounded-lg hover:bg-gray-100 transition"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>

                <div className="text-xs text-gray-500 mt-3 border-t pt-2">
                  Last login: {formatDate(user?.lastLogin)}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          className="hidden md:flex flex-col md:flex-row space-x-3 gap-3"
          style={{ width: "100%" }}
        >
          <Link
            to="/login"
            className="bg-[#0C6F89] hover:bg-[#014925] text-white font-semibold py-2 px-10 rounded-full transition duration-300 shadow-md text-center"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-transparent border-2 border-[#0C6F89] hover:bg-[#0C6F89] text-[#0C6F89] hover:text-white font-semibold py-2 px-10 rounded-full transition duration-300 shadow-md text-center"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
