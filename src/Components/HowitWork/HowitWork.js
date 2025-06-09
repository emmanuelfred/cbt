import { useEffect, useState } from 'react';
import { FaUserCircle, FaPenNib, FaCheck } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import AOS from 'aos';
import './HowitWork.css'
function HowitWork() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // fake delay
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // ← allows the animation to happen more than once
    });
  }, []);

  return (
    <div className='howitwork-container mt-5 bg-line p-4' data-aos="zoom-out">
      {
        loading ? (
          <>
            <div className='text-center'>
              <h3><Skeleton width={200} height={30} /></h3>
              <h2><Skeleton width={300} height={40} /></h2>
              <p><Skeleton count={2} width={`80%`} /></p>
            </div>
  
            <div className='steps-container'>
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="step">
                  <div className='step-icon-container'>
                    <h5 className="step-number"><Skeleton width={30} /></h5>
                    <div className="step-icon"><Skeleton circle height={40} width={40} /></div>
                  </div>
                  <h4 className="step-title"><Skeleton width={150} /></h4>
                  <h6 className="step-description"><Skeleton count={2} width={`90%`} /></h6>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className='text-center'>
              <h3>How It Works</h3>
              <h2>Experience Interactive Learning</h2>
              <p>Discover a wide range of expert-led courses tailored to your personal and professional growth.</p>
            </div>
  
            <div className='steps-container'>
  
              {/* Step 01 */}
              <div className="step" data-aos="fade-up" data-aos-delay="700">
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
              <div className="step" data-aos="fade-up" data-aos-delay="1000">
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
              <div className="step" data-aos="fade-up" data-aos-delay="1200">
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
          </>
        )
      }
    </div>
  );
  
}

export default HowitWork



