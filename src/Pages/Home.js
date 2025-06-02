import React from 'react'
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





function Home() {
  return (
   <>
 
   <Hero/>
  
  
   <TopCategories/>
    <HowitWork/>
    <PopularCourses/>
    <ServiceSection/>
    <Pricing/>
    <Testimonial/>
    <BlogSection/>
    <FAQ/>
    <Contact/>



   
   </>
  )
}

export default Home