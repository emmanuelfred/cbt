import React from 'react'
import Banner from '../Components/Banner/Banner'
import ContactForm from '../Components/ContactForm/ContactForm'
import FAQ from '../Components/FAQ/FAQ'
import Newsletter from '../Components/Newsletter/Newsletter'

function ContactUs() {
  return (
    <div>
         <Banner title="Get In Touch" description="We're here to help you learn and grow. "/>
         <ContactForm/>
         <FAQ/>
         <Newsletter/>
         
    </div>
  )
}

export default ContactUs