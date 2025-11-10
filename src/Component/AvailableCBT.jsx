import React from "react";
import jambLogo from "../assets/jamb.png";
import waecLogo from "../assets/WAEC.png";
import necoLogo from "../assets/neco.png";

function AvailableCBT() {
  const exams = [
    {
      name: "JAMB",
      logo: jambLogo,
    },
    {
      name: "WAEC",
      logo: waecLogo,
    },
    {
      name: "NECO (SSCE)",
      logo: necoLogo,
    },
    {
      name: "Junior NECO (BECE)",
      logo: necoLogo,
    },
    {
      name: "Common Entrance",
      logo: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
    },
    {
      name: "Post-UTME",
      logo: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    },
  ];

  return (
    <section className="max-w-6xl  px-6 bg-[#0c70891c] py-10 mx-2 md:mx-auto mb-20 mt-20"
        style={{ borderRadius: '160px 70px 180px 100px' }} id="cbt">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#014925] mb-10">
          Available <span className=" text-[#0C6F89]">CBT Exams</span>
        </h2>

        {/* Grid of Exams */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 justify-center">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="flex flex-col items-center  hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={exam.logo}
                alt={exam.name}
                className="w-20 h-20 object-contain "
              />
              <p className="text-gray-600 font-semibold text-sm md:text-base">
                {exam.name}
              </p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}

export default AvailableCBT;
