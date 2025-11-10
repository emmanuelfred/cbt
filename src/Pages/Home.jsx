import React from 'react'
import Hero from '../Component/Hero'
import Servivice from '../Component/Servivice'
import AboutUs from '../Component/AboutUs'
import Whyus from '../Component/Whyus'
import Courses from '../Component/Courses'
import AvailableCBT from '../Component/AvailableCBT'
import BlogSection from '../Component/BlogSection'
import FAQSection from '../Component/FAQSection'
import ContactSection from '../Component/ContactSection'


function Home() {
  return (
     <>
     <Hero/>
     <Servivice/>
     <AboutUs/>
     <Whyus/>
     <Courses/>
     <AvailableCBT/>
     <BlogSection/>
     <FAQSection/>
     <ContactSection/>
  
     </>
  )
}

export default Home