import React, { useState,useEffect } from 'react';
import './MobileHeader.css';
import logo from '../../../Assets/mobile-logo.png'
import { Link } from 'react-router-dom';

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMainNav, setShowMainNav] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setShowMainNav(window.scrollY > 50); // Change threshold as needed
      };
  
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup on unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={showMainNav ? "mobile-header shownav" : "mobile-header"}>
      <div className="header-bar">
        <Link to={'/'} className="logo"> <img src={logo} alt=""  /></Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#">Courses</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default MobileHeader;
