import React from 'react'
import hero_image from '../assets/hero.PNG';
function Hero() {
  return (
    <section class="hero-section  pt-20">
    <div class="container mx-auto  flex flex-col md:flex-row items-center justify-center">
        <div class="md:w-1/2 text-center md:text-left " style={{maxWidth:650}}>
            
            <h1 class="text-3xl md:text-4xl  mb-6 text-[#014925] " style={{fontWeight:400}}>Learn. Practice.  <span className='text-4xl md:text-6xl font-bold text-[#0C6F89]'> Excel</span>. <br/> — The Future of Testing Is Here! </h1>
            <p class="text-lg mb-8 text-gray-600">Experience seamless, secure, and reliable computer-based assessments designed to make learning and evaluation easier for students and institutions.</p>
            <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                {/* Take CBT Button */}
                <a href='./start_cbt' className="bg-[#0C6F89] hover:bg-[#014925] text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md">
                    Take CBT
                </a>

                {/* Explore Courses Button */}
                <a href='./courses' className="bg-transparent border-2 border-[#0C6F89] hover:bg-[#0C6F89] text-[#0C6F89] hover:text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md">
                    Explore Courses
                </a>
            </div>

        </div>
        <div class="md:w-1/3 mt-10 md:mt-0 hidden md:block " >
            <img src={hero_image} alt="Hero Image" class="w-full h-auto rounded-lg"/>
        </div>
    </div>
 
       
    </section>

  )
}

export default Hero