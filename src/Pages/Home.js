import React, { useEffect} from 'react'
import Hero from '../Components/Hero'
import '../Style/home.css'
import TopCategories from '../Components/TopCategories'
import HowitWork from '../Components/HowitWork/HowitWork'
import PopularCourses from '../Components/PopularCourses'
import ServiceSection from '../Components/ServiceSection/ServiceSection'
import Testimonial from '../Components/Testimonial/Testimonial'
import BlogSection from '../Components/BlogSection/BlogSection'
import FAQ from '../Components/FAQ/FAQ'
import Contact from '../Components/Contact/Contact'
import Pricing from '../Components/Pricing/Pricing'
import TakeCBTprompt from '../Components/TakeCBTprompt/TakeCBTprompt'
import AOS from 'aos';




function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // ← allows the animation to happen more than once
    });
  }, []);
  return (
   <>
 
   <Hero/>
  
  
   <TopCategories/>
   
    <HowitWork/>
    <div data-aos="zoom-out">
      <TakeCBTprompt />
    </div>
    <div data-aos="zoom-out">
      <PopularCourses/>
    </div>
    <div data-aos="zoom-out">
      <ServiceSection/>
    </div>
    <div data-aos="zoom-out">
      <Pricing/>
    </div>
    <div data-aos="zoom-out">
      <Testimonial/>
    </div>
    <div data-aos="zoom-out">
      <BlogSection/>
    </div>
    <div data-aos="zoom-out">
      <FAQ/>
    </div>
    <div data-aos="zoom-out">
      <Contact/>
    </div>
    
   
   
    
    
    
   
   



   
   </>
  )
}

export default Home