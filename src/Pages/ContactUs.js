import React, { useState, useEffect } from 'react';

import Banner from '../Components/Banner/Banner'
import ContactForm from '../Components/ContactForm/ContactForm'
import FAQ from '../Components/FAQ/FAQ'
import Newsletter from '../Components/Newsletter/Newsletter'
import ImageWithLoading from '../Components/ImageWithLoading';
import AOS from 'aos';
function ContactUs() {
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
         <Banner title="Get In Touch" description="We're here to help you learn and grow. "/>
         {loading ? 
         (<div style={{padding:10}} data-aos="zoom-out"><ImageWithLoading height={600}/></div>)
          : (
            <>
            <div data-aos="zoom-out">
              <ContactForm/>
            </div>
            <div data-aos="zoom-out">
            <FAQ/>
            </div>
            <div data-aos="zoom-out">
            <Newsletter/>
            </div>
            
            </>

          )}
        
         
         
    </div>
  )
}

export default ContactUs