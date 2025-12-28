import React from 'react'
import hero_image from '../assets/hero.PNG';
function Hero() {
  return (
    <section class="hero-section px-2 py-10 md:pt-15">
    <div class="container mx-auto  flex flex-col md:flex-row items-center justify-center">
<div
  className="md:w-1/2 text-center md:text-left"
  style={{ maxWidth: 650 }}
>
  <h1
    className="text-3xl md:text-4xl mb-6 text-[#014925]"
    style={{ fontWeight: 400 }}
  >
    Get Ready. Practice. <br />
    <span className="text-4xl md:text-6xl font-bold text-[#0C6F89]">
      Pass Any Exam
    </span>
    . <br />— Master Every CBT Like a Pro!
  </h1>

  <p className="text-lg mb-8 text-gray-600">
    Prepare confidently for JAMB, WAEC, NECO, Post-UTME, and other major exams
    with our interactive Computer-Based Testing platform. Practice real exam
    questions, track your performance, and boost your success rate with ease.
  </p>

  <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
    {/* Take CBT Button */}
    <a
      href="./start_cbt"
      className="bg-[#0C6F89] hover:bg-[#014925] text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md"
    >
      Start Practice Test
    </a>

    {/* Explore Courses Button */}
    <a
      href="./courses"
      className="bg-transparent border-2 border-[#0C6F89] hover:bg-[#0C6F89] text-[#0C6F89] hover:text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md"
    >
      Explore Study Materials
    </a>
  </div>
</div>

        <div class="md:w-1/3 mt-10 md:mt-0  " >
            <img src={hero_image} alt="Hero Image" class="w-full h-auto rounded-lg"/>
        </div>
    </div>
 
       
    </section>

  )
}

export default Hero