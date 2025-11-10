import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className=" py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        {/* Left Side - Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-[#014925] mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-8 md:w-3/4">
            Have a question, need support, or want to partner with us?  
            We’d love to hear from you! Fill out the form or reach us directly.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Mail className="text-[#0C6F89]" />
              <span className="text-gray-700">info@cbtcenter.com</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-[#0C6F89]" />
              <span className="text-gray-700">+234 806 190 9461</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-[#0C6F89]" />
              <span className="text-gray-700">
                23 Learning Avenue, Abakaliki, Nigeria
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form className="bg-[#0c70891c] p-6 rounded-2xl shadow-md md:w-2/2">
          {/* Name & Email side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <label className="block text-gray-600 font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-600 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="relative mb-6">
            <label className="block text-gray-600 font-semibold mb-1">
              Message
            </label>
            <textarea
              rows="2"
              placeholder="Type your message..."
              className="w-full border-b-2 border-[#0C6F89] bg-transparent focus:outline-none py-2 text-gray-800"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#0C6F89] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0a5d73] transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
