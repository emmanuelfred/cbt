import React, { useState } from 'react';
import './MobileHeader.css';
import logo from '../../../Assets/mobile-logo.png'

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="mobile-header">
      <div className="header-bar">
        <div className="logo"> <img src={logo} alt=""  /></div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Courses</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default MobileHeader;
