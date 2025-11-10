import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBook,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaBars,
  FaTimes,
  FaComments,
  FaMoneyBill,
  FaPen,
} from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa"; 
import { useAuthStore } from "../Store/authStore";
import logo from '../assets/edenites-logo.png'


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated,user,logout, isLoading, error} = useAuthStore();

  const menuItems = [
    { path: '/dashboard', label: 'Track Progress', icon: <FaHome /> },
    { path: '/dashboard/cbt', label: 'C B T Dashboard', icon: <FaPen /> },
    { path: '/dashboard/active', label: 'Courses', icon: <FaBook /> },
    { path: '/dashboard/chat', label: 'Chat Room', icon: <FaComments /> },
    { path: '/dashboard/profile', label: 'Profile', icon: <FaUser /> },
    { path: '/dashboard/payment', label: ' Subscription', icon: <FaMoneyBill /> },
    { path: '/home', label: 'Back To Home Page', icon: <FaArrowLeft /> }
  ];
  if (!isAuthenticated || !user) {
    return ( window.location.href = "/login" );

  }
  const handleLogout = () => {
    logout();
     return ( window.location.href = "/login" );
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 z-40 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8">
          
          <img src={logo} alt="Edenites" style={{width:150}} />
          <button
            className="md:hidden text-gray-600 hover:text-[#0C6F89]"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 w-full p-3 rounded-lg ${
                location.pathname === item.path
                  ? 'bg-[#0C6F89] text-white'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon} {item.label}
            </Link>
          ))}

          <button className="flex items-center gap-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 mt-8"onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 w-full">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-700 hover:text-[#0C6F89]"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={22} />
            </button>
            <h1 className="text-2xl font-bold text-[#0C6F89] capitalize">
              {menuItems.find((m) => location.pathname === m.path)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-[#0C6F89]" />
            <div className="flex items-center gap-2">
              <img
                src={user?.profilePic || "https://randomuser.me/api/portraits/men/1.jpg"}
                alt="User"
                className="rounded-full w-10 h-10"
              />
              <span className="font-medium text-gray-500 hidden sm:block">{user.name}</span>
            </div>
          </div>
        </div>

        {/* Dynamic content from nested routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
