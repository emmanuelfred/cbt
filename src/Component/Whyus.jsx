import React from 'react'
import aboutImg from '../assets/boy.png'
import puzzle from '../assets/puzzle.png'
import rocket from '../assets/rocket.png'
import cele from '../assets/cele.png'
import award from '../assets/award.png'

function Whyus() {
  return (
    <section className="relative bg-[#0c70891c] overflow-hidden my-20" id='why'>
      {/* --- Top Wave --- */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180 leading-none">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[120px]"
        >
          <path
            d="M0.00,49.98 C100.00,150.00 400.00,-80.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            fill="#fff"
          ></path>
        </svg>
      </div>

      {/* --- Content --- */}
      <div
        className="max-w-7xl mx-auto px-6 py-30 md:py-32 grid md:grid-cols-3 gap-10 items-center relative z-10"
      >
        {/* Left Column - Reasons */}
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 items-center">
            <img src={puzzle} alt="puzzle" className="rounded w-[70px]" />
            <div>
              <h3 className="font-bold text-[#014925]">Expert Tutors</h3>
              <p className="text-gray-600">
                Learn from qualified instructors who are dedicated to your success.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <img src={rocket} alt="rocket" className="rounded w-[70px]" />
            <div>
              <h3 className="font-bold text-[#014925]">Up-to-date Content</h3>
              <p className="text-gray-600">
                Our materials reflect the latest exam trends and CBT updates.
              </p>
            </div>
          </div>
        </div>

        {/* Middle Column - Image */}
        <div className="flex justify-center items-center">
          <img
            src={aboutImg}
            alt="About Us"
            className="rounded-3xl w-[80%] md:w-[90%] object-contain drop-shadow-lg"
          />
        </div>

        {/* Right Column - Reasons */}
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 items-center">
            <img src={award} alt="award" className="rounded w-[70px]" />
            <div>
              <h3 className="font-bold text-[#014925]">Interactive Learning</h3>
              <p className="text-gray-600">
                Enjoy engaging and interactive CBT sessions built for performance.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <img src={cele} alt="celebration" className="rounded w-[70px]" />
            <div>
              <h3 className="font-bold text-[#014925]">Trusted by Thousands</h3>
              <p className="text-gray-600">
                Thousands of students and professionals use our platform daily.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Wave --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[120px]"
        >
          <path
            d="M0.00,49.98 C100.00,150.00 400.00,-80.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            fill="#fff"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default Whyus
