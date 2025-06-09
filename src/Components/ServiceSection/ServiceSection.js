import React, { useEffect, useState } from 'react';
import './ServiceSection.css'; // You can style this using your preferred CSS method
import servicepic from '../../Assets/banner/service.PNG'; // Adjust the path as necessary
import { FaUsers, FaCertificate, FaUserTie, FaChalkboardTeacher } from "react-icons/fa";
import { MdSupportAgent, MdOfflineBolt } from "react-icons/md";
import ImageWithLoading from '../ImageWithLoading';


const ServiceSection = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulate async fetch
  }, []);
  return (
    loading ?
       ( 
        <div  style={{padding:20}}>
           <ImageWithLoading height={600}/>

        </div>
       
      ):(
        <div className='service-section'>
          <div className='service-image'>
            <img src={servicepic} alt="Service" />
            <div className='overlay'></div>
    
          </div>
          <div className='service-content-container'>
            <h3>Which Services We Provide</h3>
            <h2 className='service-title'>Learn More Skills , Be More Competitive</h2>
            <div className='service-content row'>
                <div   className="content col-md-6">
                  <div className="icon"><FaUsers/></div>
                  <div>
                  <h4>Trusted by Millions</h4>
                  <p>Join a community of millions who trust us for their learning journey.</p>
    
                  </div>
                
                </div>
                <div   className="content col-md-6">
                  <div className="icon"><FaCertificate/></div>
                  <div>
                  <h4>Certificate Awarded</h4>
                  <p>Earn recognized certificates to enhance your credentials and career prospects.</p>
    
                  </div>
                
                </div>
                <div   className="content col-md-6">
                  <div className="icon"><FaUserTie/></div>
                  <div>
                  <h4>Made by Professionals</h4>
                  <p>Learn from industry experts dedicated to delivering high-quality educational content.</p>
    
                  </div>
                
                </div>
                <div   className="content col-md-6">
                  <div className="icon"><MdSupportAgent /></div>
                  <div>
                  <h4>24/7 Support & Community</h4>
                  <p>Get instant support anytime with our round-the-clock online chat service.</p>
    
                  </div>
                
                </div>
                <div   className="content col-md-6">
                  <div className="icon"><MdOfflineBolt/></div>
                  <div>
                  <h4>Available Offline</h4>
                  <p>Access your courses anytime, anywhere, even without an internet connection.</p>
    
                  </div>
                
                </div>
                <div   className="content col-md-6">
                  <div className="icon"><FaChalkboardTeacher/></div>
                  <div>
                  <h4>600+ Hours of Classes</h4>
                  <p>Dive into over 600 hours of comprehensive classes tailored for your success.</p>
    
                  </div>
                
                </div>
    
            </div>
    
          </div>
    
        </div>

      )
    
   
 
  );
};

export default ServiceSection;
