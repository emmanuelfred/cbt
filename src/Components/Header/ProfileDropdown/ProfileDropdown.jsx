import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FiBox,
  FiClock,
  FiHeart,
  FiGift,
  FiUserPlus,
  FiLogOut,
  FiUser,
  FiHelpCircle
} from "react-icons/fi";
import "./ProfileDropdown.css";
import Skeleton from "react-loading-skeleton";
import { useAuthStore } from "../../../store/authStore";
import { formatDate } from "../../../utils/date";

function ProfileDropdown({loading}) {
  // Simulated user data (Replace with actual user state from backend)
  	const { user, logout, isAuthenticated } = useAuthStore();
    

	const handleLogout = () => {
		logout();
	};


  return (
    loading?(
    
        <div style={{display:'flex',gap:10}}>
          <Skeleton height={50} width={150}/>
          <Skeleton height={50} width={150}/>

        </div>
      
    ):(

      <div className="dropdown user">
      {/* Show User Icon when NOT Logged In, Else Show Profile Pic */}
         {/* Dropdown Menu */}
     
         { isAuthenticated ? (
          <>
           <div
        className="d-flex align-items-center dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
      
          <img
            src={user.profilePic||'https://randomuser.me/api/portraits'}
            alt="User Profile"
            className="profile-pic"
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              objectFit: "cover",
              maxWidth: "100%",
              objectPosition: "center",
            }}
          />
     
        <span className="username">
          {`Hi, ${user.name.split(" ")[0]}`}
        </span>
      </div>

   
           <div
           className="dropdown-menu dropdown-menu-end p-2 shadow"
          
         >
          <div className="profile-nav-contain">
            <div className="profile-nav">
              <FiBox className="me-2"size={35} color="#f4825d" />
              <span>Past Orders</span>
            </div>
            <div className="profile-nav">
              <FiClock className="me-2"size={35} color="#f4825d" />
              <span>Upcoming Orders</span>
            </div>
            <div className="profile-nav">
              <FiHeart className="me-2" size={35} color="#f4825d"/>
              <span>Saved</span>
            </div>
            <div className="profile-nav">
              <FiGift className="me-2"size={35} color="#f4825d" />
              <span>Gift Cards</span>
            </div>
            <div className="profile-nav">
              <FiUserPlus className="me-2"size={35} color="#f4825d" />
              <span>Refer a Friend</span>
            </div>
            <div className="profile-nav" onClick={handleLogout}>
              <FiLogOut className="me-2" size={35} color="#f4825d"/>
              <span>Logout</span>
            </div>
            <div className="profile-nav" >
              <FiUser className="me-2" size={35} color="#f4825d" />
              <span>Account</span>
            </div>
            <div className="profile-nav" >
              <FiHelpCircle className="me-2" size={35} color="#f4825d"/>
              <span>Help</span>
            </div>
          </div>
          <span>{formatDate(user.lastLogin)}</span>
          </div></>
     
        ) : (
          <div className="btn-container ">
            <Link to='/login' className="fancy-button">Login</Link>
            <Link to="/register" className="reveal-button">Sign up</Link>
          </div>
        )}
      
    </div>

    )
    
  );
}

export default ProfileDropdown;
