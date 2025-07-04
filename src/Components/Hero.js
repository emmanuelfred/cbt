import React from 'react';
import { useEffect, useState } from 'react';
import StudentStack from './StudentStack';
import { FaUsers, FaBook, FaUserGraduate ,FaChalkboardTeacher} from 'react-icons/fa';
import img1 from '../Assets/hero/hero2.jpg';
import AOS from 'aos';

import Skeleton from 'react-loading-skeleton';
import ImageWithLoading from './ImageWithLoading';



const statsData = [
  { icon: <FaUsers />, label: 'Student', target: 1027 },
  { icon: <FaBook />, label: 'Courses', target: 105 },
  { icon: <FaUserGraduate />, label: 'Graduates', target: 300 },
  { icon: <FaChalkboardTeacher />, label: 'Teacher', target: 400 },
];
function Hero() {
  const [counts, setCounts] = useState(statsData.map(() => 0));
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
  
  


  useEffect(() => {
    const intervals = statsData.map((stat, index) => {
      return setInterval(() => {
        setCounts(prevCounts => {
          const newCounts = [...prevCounts];
          if (newCounts[index] < stat.target) {
            const increment = Math.ceil(stat.target / 100);
            newCounts[index] = Math.min(newCounts[index] + increment, stat.target);
          }
          return newCounts;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);
  return (
    <>
    <div className='hero-main-container  bg-line' data-aos="zoom-out">
      <div className='container hero-main'>
          <div className='hero-text-container'>
            
          {loading ? (
            <>
              <Skeleton height={50} width={'100%'}  />
              <Skeleton height={50} width={'70%'}  />
              <Skeleton height={50} width={'50%'}  />
            
            </>
          
          ) : (
            <h1>Unlock Your Future with Online Learning</h1>
          )}

          {loading ? (
            <>
              <Skeleton height={25} width={'100%'} count={4} />
              
            
            </>
          
          ) : (
            <p>
            Discover a wide range of expert-led courses tailored to your personal and professional growth. Learn at your own pace, access resources anytime, 
            and unlock new opportunities with flexible, high-quality education designed for modern learners.
            </p>
          )}
           

           {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' ,width: '100%'}}>
                <Skeleton height={50} width="150px" />
                <Skeleton height={50} width="150px" />
              </div>
            ) : (
              <div className="btn-container">
                <a href="#" className="fancy-button">Explore courses</a>
                <a href="#" className="reveal-button">Take CBT</a>
              </div>
            )}
         
          
          </div>
          <div className='hero-portfolio-container'>
            {loading?(
              <ImageWithLoading
             
              alt="Course Image"
              width={600}
              maxWidth="600px"
              height={300}
            />
            
            ):(
              <>
              <div className='students'>
                <div style={{width:'30%'}}><StudentStack/></div>
                <span>17K+ Student</span>
              </div>
              <div className='hero-image'>
              <img src={img1} alt='hero' className='img' />
            

              </div>
            
            
              <section className="portfolio-stats" data-aos="fade-up">
                {statsData.map((stat, index) => (
                  <div className="stat-item" key={index}>
                    <div className="icon">{stat.icon}</div>
                    <div className="counter">{counts[index].toLocaleString()}</div>
                    <h6>{stat.label}</h6>
                  </div>
                ))}
              </section>
              
            </>

              
            )}
           
           
        

          
          </div>
         
      </div>
     

    </div>
   
    </>
  );
}

export default Hero;
