import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram,FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

import { FaEnvelope } from "react-icons/fa6";
import footerLogo from '../Assets/desktop-logo.png'
import { Link } from 'react-router-dom';

function Footer() {

  return (

   
    <footer className="footer-section" >
       {/*
       <div className='col-lg-3 col-md-3 col-sm-9 footer-section-content-item'>
              <h4 className="footer-section-content-title">Our Address</h4>
              <ul className="footer-section-content-list">
                <li><FaMapMarkerAlt/><span>123 Address New York, USA</span></li>
                <li><FaEnvelope />
                <span>hello@LearnEase.com</span></li>
                <li>  <FaPhoneAlt />
                <span>+1 234 567 890</span></li>
              </ul>

            </div>
      
      */}
   
      <div className="footer-section-header-container container">
          <div className="logo-section">
         
            <p className="tagline">
              Empowering learners through innovative digital education.
            </p>
          </div>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="icon" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="icon" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="icon" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon" />
            </a>
          </div>
        </div>
        <hr></hr>
        <div className="footer-section-content-container container">
          <div className="row footer-section-content">
            <div className="col-lg-3 col-md-4 col-sm-9 footer-section-content-logo">
              <img src={footerLogo} alt="logo" className="footer-logo" />
              <ul className="footer-section-content-list">
                <li><FaMapMarkerAlt/><span>123 Address New York, USA</span></li>
                <li><FaEnvelope />
                <span>hello@LearnEase.com</span></li>
                <li>  <FaPhoneAlt />
                <span>+1 234 567 890</span></li>
              </ul>
            </div>
      
           
            <div className='col-lg-2 col-md-2 col-sm-9 footer-section-content-item'>
              <h4 className="footer-section-content-title">Quick Links</h4>
              <ul className="footer-section-content-list">
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Courses</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact</a></li>
              </ul>

            </div>
           
            <div className='col-lg-2 col-md-2 col-sm-9 footer-section-content-item'>
              <h4 className="footer-section-content-title">Courses Category</h4>
              <ul className="footer-section-content-list">
                <li><a href="#">Business Management</a></li>
                <li><a href="#">Programming</a></li>
                <li><a href="#">Creative Arts</a></li>
                <li><a href="#">Digital Strategy</a></li>
                <li><a href="#">Accounting</a></li>
              </ul>

            </div>
            <div className='col-md-5 col-sm-9 footer-section-content-item'>
              <h2 className="footer-section-content-title">Join our newsletter to keep up to date with us!</h2>
              <div className="footer-section-content-form">
                <input type="email" placeholder="Enter your email" className="footer-section-content-input" />
                <button className="footer-section-content-button">Subscribe</button>
              </div>
              <p>Get the latest news about our updates and discounts</p>

            </div>
           
           
          </div>
        </div>
        <hr></hr>
        <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", color: "#fff", padding: ".5rem 0", fontSize: "14px" }}>
      <div>
        <h6 style={{ marginTop: 10 }}>
          Copyright © {new Date().getFullYear()} Global Digital Academy | Edenities Technologies
        </h6>
      </div>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px", marginTop: 10, padding: 0 }}>
        <li><Link to={'/privacy'}>Privacy Policy</Link></li>
        <li><Link to={'/terms'} >Terms & Conditions</Link></li>
        <li><Link>Cookies</Link></li>
      </ul>
    </div>
    </footer>)
}

export default Footer