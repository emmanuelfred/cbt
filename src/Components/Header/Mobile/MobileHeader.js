import React, { useState,useEffect } from 'react';
import './MobileHeader.css';
import logo from '../../../Assets/mobile-logo.png'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import ImageWithLoading from '../../ImageWithLoading';
const MobileHeader = ({loading}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMainNav, setShowMainNav] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setShowMainNav(window.scrollY > 30); // Change threshold as needed
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
        <Link to={'/'} className="logo"> {loading ? (
              <ImageWithLoading height={50} width={50}/>
              
            ) : (
              <img src={logo} alt="logo" className="logo" />
            )}</Link>
             {loading ? <Skeleton width={34} height={34} /> : 
             <button className="menu-toggle" onClick={toggleMenu}>
             ☰
           </button>}
        
      </div>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <ul>
          <li><a href="/">Home</a></li>
          <li> <Link to="/about">About Us</Link> </li>
          <li>  <Link to="/classroom">Classroom</Link></li>
          
           <li> <Link to="/pricing">Pricing</Link></li>
          <li> <Link to="/blog">Latest News</Link></li>
          <li><Link to="/contact-us">Contact</Link></li>
        </ul>
          <div className="btn-container " style={{padding:20}}>
                    <Link to='/login' className="fancy-button">Login</Link>
                    <Link to="/register" className="reveal-button">Sign up</Link>
                  </div>
      </div>

      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default MobileHeader;
