import React, { useState } from "react";
import { Link } from "react-router-dom";
import profilePicture from "../../../Assets/banner/Capturee.PNG"; // Replace with actual image path
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

function ProfileDropdown() {
  // Simulated user data (Replace with actual user state from backend)
  const [user, setUser] = useState({
    isLoggedIn: false, // Change to false to simulate a logged-out state
    name: "Kate",
    profilePic: profilePicture, // Replace with real image URL
  });

  return (
    <div className="dropdown user">
      {/* Show User Icon when NOT Logged In, Else Show Profile Pic */}
         {/* Dropdown Menu */}
     
         {user.isLoggedIn ? (
          <>
           <Link
        className="d-flex align-items-center dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
      
          <img
            src={user.profilePic}
            alt="User Profile"
            className="profile-pic"
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
     
        <span className="username">
          {user.isLoggedIn ? `Hi, ${user.name}` : ""}
        </span>
      </Link>

   
           <div
           className="dropdown-menu dropdown-menu-end p-2 shadow"
           style={{ width: "300px" }}
         >
          <div className="row">
            <div className="col-6 d-flex align-items-center mb-2">
              <FiBox className="me-2" />
              <span>Past Orders</span>
            </div>
            <div className="col-6 d-flex align-items-center mb-2">
              <FiClock className="me-2" />
              <span>Upcoming Orders</span>
            </div>
            <div className="col-6 d-flex align-items-center mb-2">
              <FiHeart className="me-2" />
              <span>Saved</span>
            </div>
            <div className="col-6 d-flex align-items-center mb-2">
              <FiGift className="me-2" />
              <span>Gift Cards</span>
            </div>
            <div className="col-6 d-flex align-items-center mb-2">
              <FiUserPlus className="me-2" />
              <span>Refer a Friend</span>
            </div>
            <div className="col-6 d-flex align-items-center mb-2">
              <FiLogOut className="me-2" />
              <span>Logout</span>
            </div>
            <div className="col-6 d-flex align-items-center mb-2">
              <FiUser className="me-2" />
              <span>Account</span>
            </div>
            <div className="col-6 d-flex align-items-center mb-2">
              <FiHelpCircle className="me-2" />
              <span>Help</span>
            </div>
          </div>
          </div></>
     
        ) : (
          <div className="btn-container ">
            <Link to='/login' className="fancy-button">Login</Link>
            <Link to="/register" className="reveal-button">Sign up</Link>
          </div>
        )}
      
    </div>
  );
}

export default ProfileDropdown;
