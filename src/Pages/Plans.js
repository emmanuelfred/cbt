import React, { useState, useEffect } from 'react';
import Banner from '../Components/Banner/Banner'
import Pricing from '../Components/Pricing/Pricing'
import PopularCourses from '../Components/PopularCourses'
import Contact from '../Components/Contact/Contact'
import ImageWithLoading from '../Components/ImageWithLoading';
import AOS from 'aos';

function Plans() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // ← allows the animation to happen more than once
    });
  }, []);
  return (
    <div>
         <Banner title="Choose a plan " description="Discover a wide range of expert-led courses tailored to your personal and professional growth."/>
         {loading ? 
         (<div style={{padding:10}} data-aos="zoom-out"><ImageWithLoading height={600}/></div>)
          : (
            <>
            <div data-aos="zoom-out">
            <Pricing/>
            </div>
            <div data-aos="zoom-out">
            <PopularCourses/>
            </div>
            <div data-aos="zoom-out">
            <Contact/>
            </div>
            
           
           
            
            </>


          )}
        
         
         
         

    </div>
  )
}

export default Plans