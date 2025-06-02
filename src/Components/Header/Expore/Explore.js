import React, { useState, useRef, useEffect } from "react";
import { FiCompass } from "react-icons/fi"; 
import './Explore.css'

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
        <a href="#">Item 1</a>
        <a href="#">Item 2</a>
        <a href="#">Item 3</a>
      </div>
    </div>
  )
}

export default Explore