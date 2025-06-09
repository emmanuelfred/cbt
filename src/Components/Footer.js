import React, { useEffect} from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram,FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import AOS from 'aos';
import { FaEnvelope } from "react-icons/fa6";
import footerLogo from '../Assets/desktop-logo.png'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import ImageWithLoading from './ImageWithLoading';

function Footer() {
  const [loading, setLoading] = React.useState(true);

useEffect(() => {
  AOS.init({ duration: 1000, once: false });

  const timer = setTimeout(() => {
    setLoading(false);
  }, 1000); // Simulate loading delay

  return () => clearTimeout(timer);
}, []);



  return (
    

    
   
    <footer className="footer-section" data-aos="zoom-out" >
      
   
      <div className="footer-section-header-container container">
          <div className="logo-section">
         
            <p className="tagline">
            {loading ? <Skeleton width={300} height={25}/> : 'Empowering learners through innovative digital education.'}
              
            </p>
          </div>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
            {loading ? <Skeleton circle={true} width={30} height={30}/> :  <FaFacebookF className="icon" />}
             
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
            {loading ? <Skeleton circle={true} width={30} height={30}/> :  <FaTwitter className="icon" />}
              
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
            {loading ? <Skeleton circle={true} width={30} height={30}/> :  <FaYoutube className="icon" />}
              
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
            {loading ? <Skeleton circle={true} width={30} height={30}/> :   <FaInstagram className="icon" />}
            
            </a>
          </div>
        </div>
        <hr></hr>
        <div className="footer-section-content-container container">
          <div className="row footer-section-content">
          <div className="col-lg-3 col-md-4 col-sm-9 footer-section-content-logo">
            {loading ? (
              <ImageWithLoading height={100} width={120}/>
              
            ) : (
              <img src={footerLogo} alt="logo" className="footer-logo" />
            )}
            <ul className="footer-section-content-list">
              <li>{loading ? <Skeleton circle={true} width={30} height={30}/> :   <FaMapMarkerAlt />}<span>{loading ? <Skeleton width={150}   height={20}/> : '123 Address New York, USA'}</span></li>
              <li>{loading ? <Skeleton circle={true} width={30} height={30}/> :   <FaEnvelope /> }<span>{loading ? <Skeleton width={180}  height={20} /> : 'hello@LearnEase.com'}</span></li>
              <li>{loading ? <Skeleton circle={true} width={30} height={30}/> :   <FaPhoneAlt /> }<span>{loading ? <Skeleton width={100}  height={20} /> : '+1 234 567 890'}</span></li>
            </ul>
          </div>

      
           
          <div className='col-lg-2 col-md-2 col-sm-9 footer-section-content-item'>
              <h4 className="footer-section-content-title">
                {loading ? <Skeleton width={120} /> : 'Quick Links'}
              </h4>
              <ul className="footer-section-content-list">
                {loading
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
                {loading ? <Skeleton width={120}  /> : 'Courses Category'}
              </h4>
              <ul className="footer-section-content-list">
                {loading
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
                {loading ? <Skeleton width={300} height={24} /> : 'Join our newsletter to keep up to date with us!'}
              </h2>
              <div className="footer-section-content-form">
                {loading ? (
                  <>
                    <Skeleton height={40} width={250} style={{ marginBottom: '0.5rem' }} />
                  
                  </>
                ) : (
                  <>
                    <input type="email" placeholder="Enter your email" className="footer-section-content-input" />
                    <button className="footer-section-content-button">Subscribe</button>
                  </>
                )}
              </div>
              <p>{loading ? <Skeleton width={250}  height={20} /> : 'Get the latest news about our updates and discounts'}</p>
            </div>

           
           
          </div>
        </div>
        <hr></hr>
        <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", color: "#fff", padding: ".5rem 0", fontSize: "14px" }}>
      <div>
      {loading ? <Skeleton width={300} height={25}/> : 
      <h6 style={{ marginTop: 10 }}>
       
      Copyright © {new Date().getFullYear()} Global Digital Academy | Edenities Technologies
    </h6>}
        
      </div>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px", marginTop: 10, padding: 0 }}>
        <li><Link to={'/privacy'}> {loading ? <Skeleton width={100} height={25}/> : 'Privacy Policy'}</Link></li>
        <li><Link to={'/terms'} >{loading ? <Skeleton width={100} height={25}/> : 'Terms & Conditions'}</Link></li>
        <li><Link>{loading ? <Skeleton width={100} height={25}/> : 'Cookies'}</Link></li>
      </ul>
    </div>
    </footer>)
}

export default Footer