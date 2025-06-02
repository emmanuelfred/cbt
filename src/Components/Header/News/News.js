import React, { useState, useRef, useEffect } from "react";
import "./News.css";
import { FaRegNewspaper } from "react-icons/fa";

function News() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) { // desktop hover
      setIsOpen(true);
    }
  };

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="news-dropdown-container"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
    >
      <div className="nav-item" onClick={handleClick}>
        <FaRegNewspaper size={24} />
        <span>Latest News</span>
      </div>

      {isOpen && (
        <div className="news-dropdown-menu">
          <a href="#">Item 1</a>
          <a href="#">Item 2</a>
          <a href="#">Item 3</a>
        </div>
      )}
    </div>
  );
}

export default News;
