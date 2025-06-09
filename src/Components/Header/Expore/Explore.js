import React, { useState, useRef, useEffect } from "react";
import { FiCompass } from "react-icons/fi"; 
import './Explore.css'
import { Link } from "react-router-dom";

function Explore() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    const toggleDropdown = () => {
      setIsOpen((prev) => !prev);
    };
  
  return (
   
     <div
      className="dropdown-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <span style={{display:'flex' ,alignItems:'center',gap:5}}>
      <FiCompass size={20} />
      Explore</span>

      <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
      <Link to="/">Home</Link>
           <Link to="/about">About Us</Link> 
            <Link to="/classroom">Classroom</Link>
          
            <Link to="/pricing">Pricing</Link>
           <Link to="/blog">Latest News</Link>
          <Link to="/contact-us">Contact</Link>
      </div>
    </div>
  )
}

export default Explore