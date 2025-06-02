import React from 'react'

function Newsletter() {
  return (
    <div className='contact-section mt-5 blog-section' style={{backgroundColor:'#20537c', padding:'50px 0'}}>
    <div style={{maxWidth: '900px', margin: '0 auto',display:'flex'
, flexDirection:'column', justifyContent:'center', alignItems:'center'
    }} className='text-center mb-4'>
    <h1>Subscribe Our Newsletter</h1>
    <p style={{color:'#fff'}}>
    Get the latest news about our updates and discounts
    </p>
    <div className="footer-section-content-form" style={{width:'95%',maxWidth:600}}>
                <input type="email" placeholder="Enter your email" className="footer-section-content-input" />
                <button className="footer-section-content-button">Subscribe</button>
              </div>

    </div>
   
</div>
  )
}

export default Newsletter