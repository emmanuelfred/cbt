import React from 'react'
import Banner from '../Components/Banner/Banner'
import Pricing from '../Components/Pricing/Pricing'
import PopularCourses from '../Components/PopularCourses'
import Contact from '../Components/Contact/Contact'

function Plans() {
  return (
    <div>
         <Banner title="Choose a plan " description="Discover a wide range of expert-led courses tailored to your personal and professional growth."/>
         <Pricing/>
         <PopularCourses/>
         <Contact/>

    </div>
  )
}

export default Plans