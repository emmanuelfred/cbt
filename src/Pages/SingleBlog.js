import React from 'react'
import Banner from '../Components/Banner/Banner'
import BlogSection from '../Components/BlogSection/BlogSection'
import Newsletter from '../Components/Newsletter/Newsletter'
import Testimonial from '../Components/Testimonial/Testimonial'

function SingleBlog() {
  return (
    <div>
         <Banner title="Latest Blog Post" description="Discover a wide range of expert-led courses tailored to your personal and professional growth."/>
         <div className='container '>
           <div className='row'>
           <div className='col-md-9'>
                <img src='https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg' 
                 alt='post image' style={{width:'95%',margin:'0 auto',borderRadius:10}}/>
                <div className='Blog-content'>
                    <h2 className='mt-3'>Discover a wide range of expert-led courses tailored to your personal and professional growth.</h2>
                    <p>
                    In this comprehensive masterclass, you will explore the foundational elements of graphic design, including color theory, typography, and composition. From basic design concepts to more advanced techniques, the course aims to equip you with the skills needed to create visually compelling and professional designs.

                    The curriculum covers popular design software such as Adobe Illustrator, Photoshop, and InDesign, offering hands-on experience with these industry-standard tools. By the end of the course, you’ll have a portfolio that showcases your ability to design logos, branding materials, marketing assets, and more.

                    Whether you’re looking to advance your career in graphic design or simply want to learn a new skill, this course will help you understand and apply design principles in a way that communicates effectively and captivates your audience.
                    </p>

                </div>

            </div>
            <div className='col-md-3'>
                <h3>Related Post</h3>
                <div className='mb-3' >
                    <img src='https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg' 
                    alt='post image' style={{borderRadius:10}} className='col-5'/>
                    <span className='col-7 ml-3' style={{marginLeft:10}}>
                    Discover a wide range of expert-led courses tailored to your personal and professional growth.

                    </span>

                </div>
                <div className='mb-3' >
                    <img src='https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg' 
                    alt='post image' style={{borderRadius:10}} className='col-5'/>
                    <span className='col-7 ml-3' style={{marginLeft:10}}>
                    Discover a wide range of expert-led courses tailored to your personal and professional growth.

                    </span>

                </div>
                <div className='mb-3' >
                    <img src='https://theme.vividusmockup.com/learnease/wp-content/uploads/sites/3/2024/10/game-developers-discussing-team-workflow-in-order-2023-11-27-05-23-54-GNRGUHD.jpg' 
                    alt='post image' style={{borderRadius:10}} className='col-5'/>
                    <span className='col-7 ml-3' style={{marginLeft:10}}>
                    Discover a wide range of expert-led courses tailored to your personal and professional growth.

                    </span>

                </div>

            </div>

           </div>

         </div>
         <BlogSection/>
         <Testimonial/>
         <Newsletter/>
    </div>
  )
}

export default SingleBlog