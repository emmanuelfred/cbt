import React from 'react';
import aboutImg from '../assets/aboutus.png'; // <-- replace with your actual image path

function AboutUs() {
  return (
    <section className="py-20 bg-white wave-bg" id='about'>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* --- Image Section --- */}
        <div className="flex justify-center align-center">
          <img
            src={aboutImg}
            alt="About our platform"
            className="rounded-2xl  w-full md:w-[90%] object-cover"
          />
        </div>
        
        {/* --- Text Section --- */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#0A7431] mb-4">
            About <span className="text-[#0C6F89]">Our Platform</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We’re dedicated to providing students with the tools and resources they
            need to excel in their CBT exams. Our platform offers past questions,
            mock tests, and learning materials that make preparation easy and effective.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            With a growing library of over <span className="font-semibold text-[#0A7431]">1,500+ exams</span>
            and <span className="font-semibold text-[#0C6F89]">500+ courses</span>, 
            we aim to bridge the gap between technology and education.
          </p>

          <button className="bg-[#0C6F89] hover:bg-[#37B44A] text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300">
            Learn More
          </button>
        </div>

        
      </div>
    </section>
  );
}

export default AboutUs;
