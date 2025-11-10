import React from 'react';

function Service() {
  return (
    <section className="py-10">
      <div
        className="max-w-6xl mx-auto px-6 bg-[#0c70891c] py-10"
        style={{ borderRadius: '160px 70px 180px 100px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 text-center">
          {/* --- First Card --- */}
          <div className="py-10 px-6">
            <h2 className="text-3xl font-extrabold text-[#0A7431]">1.5k+</h2>
            <h3 className="font-bold text-[#0A7431] mt-2">
              CBT Exams & Past Questions
            </h3>
            <p className="mt-3 text-gray-600">
              Access thousands of verified CBT exams and past questions designed to prepare you for success.
            </p>
          </div>

          {/* --- Middle Card (with responsive border) --- */}
          <div
            className="
              py-10 px-6 
              border-t-2 border-b-2 border-dashed border-[#0A7431] 
              md:border-t-0 md:border-b-0 md:border-l-2 md:border-r-2
            "
          >
            <h2 className="text-3xl font-extrabold text-[#0C6F89]">500+</h2>
            <h3 className="font-bold text-[#0C6F89] mt-2">
              Courses & Tutorials
            </h3>
            <p className="mt-3 text-gray-600">
              Learn from top instructors across various subjects with well-structured courses.
            </p>
          </div>

          {/* --- Third Card --- */}
          <div className="py-10 px-6">
            <h2 className="text-3xl font-extrabold text-[#37B44A]">2k+</h2>
            <h3 className="font-bold text-[#37B44A] mt-2">
              Students Trained
            </h3>
            <p className="mt-3 text-gray-600">
              Thousands of learners trust us to help them achieve their academic and career goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
