import React from 'react'
import './Contact.css' // You can style this using your preferred CSS method

function Contact() {
  return (
    <div className='contact-section mt-5 ' style={{backgroundColor:'#F8F9F5', padding:'50px 0'}}>
        <div style={{maxWidth: '900px', margin: '0 auto',display:'flex'
, flexDirection:'column', justifyContent:'center', alignItems:'center'
        }} className='text-center mb-4'>
        <h2>Ready to start learning? Contact us!</h2>
        <p>
        Discover a wide range of expert-led courses tailored to your personal and professional growth.
        </p>
        <div className='text-center mt-2 btn-container' style={{width:200}}>
                <a href='#' className='reveal-button  ' style={{width:'100%'}}>Contact us!</a>
               
            </div>

        </div>
       
    </div>
  )
}

export default Contact