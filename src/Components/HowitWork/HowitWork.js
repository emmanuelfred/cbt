import React from 'react'
import { FaUserCircle, FaPenNib, FaCheck } from "react-icons/fa";
import './HowitWork.css'
function HowitWork() {
  return (
    <div className='howitwork-container mt-5  bg-line p-4'>
       <div className='text-center'>
            <h3>How It Works</h3>
            <h2>Experience Interactive Learning</h2>
            <p>Discover a wide range of expert-led courses tailored to your personal and professional growth.</p>
        </div>
        <div className='steps-container'>
          
      {/* Step 01 */}
      <div className="step fadeInLeft">
      <div className='step-icon-container'>
      <h5 className="step-number">01</h5>
        <div className="step-icon">
          <FaUserCircle />
        </div>

      </div>
        
        <h4 className="step-title">Sign Up</h4>
        <h6 className="step-description">
          Create an account in minutes by providing your details and accessing the student dashboard.
        </h6>
      </div>

      {/* Step 02 */}
      <div className="step fadeInUp">
      <div className='step-icon-container'>
        <h5 className="step-number">02</h5>
          <div className="step-icon">
            <FaPenNib />
          </div>

      </div>
       
        <h4 className="step-title">Select a Course</h4>
        <h6 className="step-description">
          Browse our wide range of courses, choose your preferred subject, and enroll instantly.
        </h6>
      </div>

      {/* Step 03 */}
      <div className="step fadeInRight">
        <div className='step-icon-container'>
        <h5 className="step-number">03</h5>
        <div className="step-icon">
          <FaCheck />
        </div>

        </div>
        
        <h4 className="step-title">Start Learning</h4>
        <h6 className="step-description">
          Access course materials, join interactive lessons, and complete assignments at your own pace.
        </h6>
      </div>
    </div>
     
        

    </div>
  )
}

export default HowitWork