import React from 'react'
import { useEffect, useState } from 'react';
import Banner from '../Components/Banner/Banner'
import '../Style/about.css'

import FAQ from '../Components/FAQ/FAQ'
import Contact from '../Components/Contact/Contact'
import { FaCheck ,FaUsers, FaBook, FaUserGraduate ,FaChalkboardTeacher} from 'react-icons/fa';

import about from '../Assets/banner/about.png'
const statsData = [
  { icon: <FaUsers size={90} />, label: 'Student', target: 1027 },
  { icon: <FaBook size={60} />, label: 'Courses', target: 105 },
  { icon: <FaUserGraduate size={60} />, label: 'Graduates', target: 300 },
  { icon: <FaChalkboardTeacher size={60} />, label: 'Teacher', target: 400 },
];

function About() {
    const [counts, setCounts] = useState(statsData.map(() => 0));
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
    <div>
      <Banner title="About Us" description="Unlock Your Future with Online Learning"/>
      <div className='container '>
        <div className='row  ' style={{justifyContent:'center'}} >
        <div className='col-md-6'>
            <img src={about} alt="About Us" className='img-fluid' />
          </div>
          <div className='col-md-6 about-content'>
            <h3>Learn. Grow. Succeed.</h3>
            <h1>Empowering Minds, Shaping Futures</h1>
            <p>Our platform was established with the vision to make quality education accessible to everyone, anywhere. Since our inception, we’ve grown into a hub of knowledge, offering courses across diverse fields to foster lifelong learning.</p>
              <div className=' row'>
                <div   className="content col-md-6">
                  <div className="icon"><FaCheck  /></div>
                  <div>
                  <h4>Trusted by Millions</h4>
                 
                  </div>
                
                </div>
                <div   className="content col-md-6">
                  <div className="icon"><FaCheck  /></div>
                  <div>
                  <h4>Certificate Awarded</h4>
                 
    
                  </div>
                
                </div>
                <div   className="content col-md-6">
                  <div className="icon"><FaCheck className="text-green-500 w-5 h-5" /></div>
                  <div>
                  <h4>Made by Professionals</h4>
                 
    
                  </div>
                
                </div>
                <div   className="content col-md-6">
                  <div className="icon"><FaCheck className="text-green-500 w-5 h-5" /></div>
                  <div>
                  <h4>24/7 Support & Community</h4>
                  
    
                  </div>
                
                </div>
              </div>
          </div>

          
        </div>


      </div>
      <div className='portofilo-section mt-5'>

        <section className="portfolio">
            {statsData.map((stat, index) => (
              <div className="stat-item" key={index}>
                <div className="icon">{stat.icon}</div>
                <h1 className="counter">{counts[index].toLocaleString()}</h1>
                <h6>{stat.label}</h6>
              </div>
            ))}
          </section>

      </div>
      <div className='container-fluid row mt-5 p-4 about-us bg-line' style={{backgroundColor:'#F8F9F5'}}>
        <div className='col-md-6 about-content'>
            <h3>Our Vision</h3>
            <h2>Shaping the future of education</h2>
            <p>Our vision is to become a leader in online education, known for innovation and excellence. As technology evolves, so do we. By integrating new learning technologies and methodologies, we aim to offer an even more immersive and impactful learning experience.</p>
              <div className=' row'>
                <div   className="content ">
                  <div className="icon"><FaCheck  /></div>
                  <div>
                  <h4>Leveraging the latest technologies</h4>
                 
                  </div>
                
                </div>
                <div   className="content ">
                  <div className="icon"><FaCheck  /></div>
                  <div>
                  <h4>Expanding our course offerings</h4>
                 
    
                  </div>
                
                </div>
                <div   className="content ">
                  <div className="icon"><FaCheck className="text-green-500 w-5 h-5" /></div>
                  <div>
                  <h4>Innovating with immersive learning tools</h4>
                 
    
                  </div>
                
                </div>
                <div   className="content ">
                  <div className="icon"><FaCheck className="text-green-500 w-5 h-5" /></div>
                  <div>
                  <h4>Partnering with leading institutions globally</h4>
                  
    
                  </div>
                
                </div>
                <div   className="content">
                  <div className="icon"><FaCheck className="text-green-500 w-5 h-5" /></div>
                  <div>
                  <h4>Supporting educators to improve teaching</h4>
                  
    
                  </div>
                
                </div>
                
              </div>

          </div>
        <div className='border '>

        </div>

          <div className='col-md-6 about-content'>
            <h3>Our Mission</h3>
            <h2>Transforming lives through education</h2>
            <p>We believe that everyone deserves the chance to learn and grow, no matter where they are in life. Our mission is to remove barriers to education, making it accessible to anyone with a desire to learn.</p>
              <div className=' row'>
                <div   className="content ">
                  <div className="icon"><FaCheck  /></div>
                  <div>
                  <h4>Accessibility for all learners</h4>
                 
                  </div>
                
                </div>
                <div   className="content ">
                  <div className="icon"><FaCheck  /></div>
                  <div>
                  <h4>Bridging the education gap globally</h4>
                 
    
                  </div>
                
                </div>
                <div   className="content ">
                  <div className="icon"><FaCheck className="text-green-500 w-5 h-5" /></div>
                  <div>
                  <h4>Offering up-to-date, relevant content</h4>
                 
    
                  </div>
                
                </div>
                <div   className="content ">
                  <div className="icon"><FaCheck className="text-green-500 w-5 h-5" /></div>
                  <div>
                  <h4>Fostering personal and professional growth</h4>
                  
    
                  </div>
                
                </div>
                <div   className="content ">
                  <div className="icon"><FaCheck className="text-green-500 w-5 h-5" /></div>
                  <div>
                  <h4>Supporting learners with tools and resources</h4>
                  
    
                  </div>
                
                </div>
                
              </div>

          </div>


      </div>
        
    


    
    <FAQ/>
    <Contact/>
     
    </div>
  )
}

export default About