import React, { useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="contact" className="py-20 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-[#014925] mb-3">
            Get in Touch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question, need support, or want to partner with us?  
            We'd love to hear from you!
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left - Contact Form */}
          <form
            className="bg-white p-8 rounded-2xl shadow-lg border border-[#0c70891c]"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-semibold text-[#0C6F89] mb-6 text-center">
              Send Us a Message
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-1 focus:ring-[#0C6F89] focus:outline-none text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-1 focus:ring-[#0C6F89] focus:outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-1 focus:ring-[#0C6F89] focus:outline-none text-gray-800 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0C6F89] hover:bg-[#0a5d73] text-white py-3 rounded-full font-semibold transition"
            >
              Send Message
            </button>
          </form>

          {/* Right - Contact Info + Map */}
          <div className="flex flex-col gap-6" data-aos="fade-up" data-aos-delay="200">
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#0c70891c]">
              <h3 className="text-2xl font-semibold text-[#0C6F89] mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-[#0C6F89]" />
                  <span className="text-gray-700">info@cbtcenter.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-[#0C6F89]" />
                  <span className="text-gray-700">+234 706 133 5767</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#0C6F89]" />
                  <span className="text-gray-700">
                    21 Afikpo Road, Abakaliki, Nigeria
                  </span>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div
              className="overflow-hidden rounded-2xl shadow-lg border border-[#0c70891c]"
              data-aos="zoom-in"
            >
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.631878046646!2d8.0981!3d6.3249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x106e0b83c8e8a53f%3A0x5f7e3f3dcf9d03a0!2sAbakaliki%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1694035123456!5m2!1sen!2sng"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
