import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "../Component/Hero";
import Servivice from "../Component/Servivice";
import AboutUs from "../Component/AboutUs";
import Whyus from "../Component/Whyus";
import Courses from "../Component/Courses";
import AvailableCBT from "../Component/AvailableCBT";
import BlogSection from "../Component/BlogSection";
import FAQSection from "../Component/FAQSection";
import ContactSection from "../Component/ContactSection";

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      easing: "ease-in-out",
      once: true, // whether animation happens only once
    });
  }, []);

  return (
    <>
      <div data-aos="fade-up">
        <Hero />
      </div>

      <div data-aos="fade-up" data-aos-delay="100">
        <Servivice />
      </div>

      <div data-aos="fade-up" data-aos-delay="200">
        <AboutUs />
      </div>

      <div data-aos="fade-up" data-aos-delay="300">
        <Whyus />
      </div>

      <div data-aos="fade-up" data-aos-delay="400">
        <Courses />
      </div>

      <div data-aos="fade-up" data-aos-delay="500">
        <AvailableCBT />
      </div>

      <div data-aos="fade-up" data-aos-delay="600">
        <BlogSection />
      </div>

      <div data-aos="fade-up" data-aos-delay="700">
        <FAQSection />
      </div>

      <div data-aos="fade-up" data-aos-delay="800">
        <ContactSection />
      </div>
    </>
  );
}

export default Home;
