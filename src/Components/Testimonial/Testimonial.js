import React, { useEffect, useState } from 'react';
import './Testimonial.css'; // You can style this using your preferred CSS method
import StudentStack from '../StudentStack';
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImageWithLoading from '../ImageWithLoading';

const testimonials = [
  {
    name: "Michael Chen",
    title: "Student",
    image:
      "https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/happy-female-teacher-standing-in-front-of-whiteboa-2023-11-27-05-35-50-8H5AKTF.jpeg",
    text:
      "What impressed me most were the six distinct services that catered to every aspect of my learning journey. Whether I needed feedback or extra resources, everything was just a click away!",
  },
  {
    name: "Maria Anderson",
    title: "Student",
    image:
      "https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/woman-studying-in-the-university-2023-11-27-05-18-30-ND466C5.jpeg",
    text:
      "The variety of courses offered has truly transformed the way I learn. I appreciate the flexibility and the quality of the six key services, which helped me master new skills in no time!",
  },
  {
    name: "David Lee",
    title: "Student",
    image:
      "https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/woman-studying-at-the-college-2023-11-27-05-16-05-NTSK2FZ.jpeg",
    text:
      "From live classes to personal mentorship, the platform’s six different services provided everything I needed to succeed. I feel more confident in my abilities, thanks to the comprehensive support I received!",
  },
];
export default function Testimonial() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulate async fetch
  }, []);
  return (
    <div className='testimonial-section mt-5 container'>
      {
        loading ?(

          <ImageWithLoading height={400}/>
        ):(
          <>
          <div className='testimonial-header1'>
                <div>
                <h3>Testimonial</h3>
                    <h2 className='testimonial-title'>What Our Students Say</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna adipiscing elit.</p>
    
                </div>
                <div className='students' style={{position:'static'}}>
                  <div style={{width:'30%'}}><StudentStack/></div>
                  <span>17K+ Student</span>
                </div>
                
    
            </div>
            <div className="testimonial-slider">
          <Swiper
            modules={[ Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
          
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <cite className="testimonial-cite">
                      <span className="testimonial-name">{item.name}</span>
                      <span className="testimonial-title">{item.title}</span>
                    </cite>
                    <div className="testimonial-icon">
                      <svg
                        aria-hidden="true"
                        className="quote-icon"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M464 32H336c-26.5..."></path>
                      </svg>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    <p className="testimonial-text">"{item.text}"</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
          
          </>

        )
      }
      
     
       
       
       

    </div>
  )
}
