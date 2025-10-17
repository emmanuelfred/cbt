import React, { useState,useEffect} from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram,FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import AOS from 'aos';
import { FaEnvelope } from "react-icons/fa6";
import footerLogo from '../Assets/desktop-logo.png'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import ImageWithloadingpage from './ImageWithLoading';
import { useAuthStore } from "../store/authStore";
import { useNewsletterStore } from "../store/newletterStore";

function Footer() {
        const {  user,isAuthenticated } = useAuthStore();
    
    const [email, setEmail] = useState("");
  const name = isAuthenticated ? user.name : 'Student';
  
  
    const { subscribe, loading, message, error } = useNewsletterStore();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email) return;
      subscribe(email, name);
    };
  
  const [loadingpage, setloadingpage] = useState(true);

useEffect(() => {
  AOS.init({ duration: 1000, once: false });

  const timer = setTimeout(() => {
    setloadingpage(false);
  }, 1000); // Simulate loadingpage delay

  return () => clearTimeout(timer);
}, []);



  return (
    

    
   
    <footer className="footer-section" data-aos="zoom-out" >
      
   
      <div className="footer-section-header-container container">
          <div className="logo-section">
         
            <p className="tagline">
            {loadingpage ? <Skeleton width={300} height={25}/> : 'Empowering learners through innovative digital education.'}
              
            </p>
          </div>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
            {loadingpage ? <Skeleton circle={true} width={30} height={30}/> :  <FaFacebookF className="icon" />}
             
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
            {loadingpage ? <Skeleton circle={true} width={30} height={30}/> :  <FaTwitter className="icon" />}
              
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
            {loadingpage ? <Skeleton circle={true} width={30} height={30}/> :  <FaYoutube className="icon" />}
              
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
            {loadingpage ? <Skeleton circle={true} width={30} height={30}/> :   <FaInstagram className="icon" />}
            
            </a>
          </div>
        </div>
        <hr></hr>
        <div className="footer-section-content-container container">
          <div className="row footer-section-content">
          <div className="col-lg-3 col-md-4 col-sm-9 footer-section-content-logo">
            {loadingpage ? (
              <ImageWithloadingpage height={100} width={120}/>
              
            ) : (
              <img src={footerLogo} alt="logo" className="footer-logo" />
            )}
            <ul className="footer-section-content-list">
              <li>{loadingpage ? <Skeleton circle={true} width={30} height={30}/> :   <FaMapMarkerAlt />}<span>{loadingpage ? <Skeleton width={150}   height={20}/> : '123 Address New York, USA'}</span></li>
              <li>{loadingpage ? <Skeleton circle={true} width={30} height={30}/> :   <FaEnvelope /> }<span>{loadingpage ? <Skeleton width={180}  height={20} /> : 'hello@LearnEase.com'}</span></li>
              <li>{loadingpage ? <Skeleton circle={true} width={30} height={30}/> :   <FaPhoneAlt /> }<span>{loadingpage ? <Skeleton width={100}  height={20} /> : '+1 234 567 890'}</span></li>
            </ul>
          </div>

      
           
          <div className='col-lg-2 col-md-2 col-sm-9 footer-section-content-item'>
              <h4 className="footer-section-content-title">
                {loadingpage ? <Skeleton width={120} /> : 'Quick Links'}
              </h4>
              <ul className="footer-section-content-list">
                {loadingpage
                  ? Array(5).fill().map((_, i) => <li key={i}><Skeleton width={100}  height={20} /></li>)
                  : <>
                      <li><a href="#">Home</a></li>
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Courses</a></li>
                      <li><a href="#">FAQ</a></li>
                      <li><a href="#">Contact</a></li>
                    </>
                }
              </ul>
            </div>

            <div className='col-lg-2 col-md-2 col-sm-9 footer-section-content-item'>
              <h4 className="footer-section-content-title">
                {loadingpage ? <Skeleton width={120}  /> : 'Courses Category'}
              </h4>
              <ul className="footer-section-content-list">
                {loadingpage
                  ? Array(5).fill().map((_, i) => <li key={i}><Skeleton width={100} height={20} /></li>)
                  : <>
                      <li><a href="#">Business Management</a></li>
                      <li><a href="#">Programming</a></li>
                      <li><a href="#">Creative Arts</a></li>
                      <li><a href="#">Digital Strategy</a></li>
                      <li><a href="#">Accounting</a></li>
                    </>
                }
              </ul>
            </div>

           
           
            <div className='col-md-5 col-sm-9 footer-section-content-item'>
              <h2 className="footer-section-content-title">
                {loadingpage ? <Skeleton width={300} height={24} /> : 'Join our newsletter to keep up to date with us!'}
              </h2>
              <form
          onSubmit={handleSubmit}
          className="footer-section-content-form"
         >
                {loadingpage ? (
                  <>
                    <Skeleton height={40} width={250} style={{ marginBottom: '0.5rem' }} />
                  
                  </>
                ) : (
                  <>
                
       
          <input
            type="email"
            placeholder="Enter your email"
            className="footer-section-content-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="footer-section-content-button"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
      
                  </>
                )}
              </form>
              {message && (
          <p className="mt-3 text-[#f4825d] text-sm">{message}</p>
        )}
        {error && <p className="mt-3 text-red-300 text-sm">{error}</p>}
              <p>{loadingpage ? <Skeleton width={250}  height={20} /> : 'Get the latest news about our updates and discounts'}</p>
            </div>

           
           
          </div>
        </div>
        <hr></hr>
        <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", color: "#fff", padding: ".5rem 0", fontSize: "14px" }}>
      <div>
      {loadingpage ? <Skeleton width={300} height={25}/> : 
      <h6 style={{ marginTop: 10 }}>
       
      Copyright © {new Date().getFullYear()} Global Digital Academy | Edenities Technologies
    </h6>}
        
      </div>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px", marginTop: 10, padding: 0 }}>
        <li><Link to={'/privacy'}> {loadingpage ? <Skeleton width={100} height={25}/> : 'Privacy Policy'}</Link></li>
        <li><Link to={'/terms'} >{loadingpage ? <Skeleton width={100} height={25}/> : 'Terms & Conditions'}</Link></li>
        <li><Link>{loadingpage ? <Skeleton width={100} height={25}/> : 'Cookies'}</Link></li>
      </ul>
    </div>
    </footer>)
}

export default Footer