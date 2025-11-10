import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import logo from "../assets/edenites-favicon.png";

const Footer = () => {
  return (
    <footer className="relative bg-[#0C6F89] text-white pt-20 pb-12">
      {/* 🌊 Wave Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39 56.44C208.15 75.3 103.43 104.72 0 120h1200V0c-100.85 41.06-221.74 65.32-341.33 65.32-183.39 0-341.33-71.33-537.28-8.88z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* About Section */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          {/*<img
            src={logo}
            alt="CBT Center Logo"
            style={{ width: 100 }}
            className="mb-4"
          />*/}
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="edenites technologies" style={{width:37}}/>
            <h3 className="text-2xl font-bold ">Edenites Academy</h3>
          </div>
          
          <p className="text-sm text-gray-200 leading-relaxed">
            We provide top-quality CBT preparation and learning resources
            to help students excel in all levels of exams across Nigeria.
          </p>
          <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-200">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#courses" className="hover:underline">Courses</a></li>
            <li><a href="#cbt" className="hover:underline">CBT Exams</a></li>
            <li><a href="#blog" className="hover:underline">Blog</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-center gap-3">
              <Mail size={18} /> info@cbtcenter.com
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} /> +234 806 190 9461
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} /> 23 Learning Avenue, Abakaliki, Nigeria
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
           <div className="">
            <h4 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <h4 className="text-[#014925] font-semibold mb-2 text-center"></h4>
            <p className="text-sm text-gray-200 leading-relaxed">
              Get updates on new courses, exams, and learning tips.
            </p>
            <form className="flex mt-5" style={{width:'100%',overflow:'hidden'}}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-l-lg border-3 border-white focus:outline-none text-white text-sm"
                required
                style={{maxWidth:'70%'}}
              />
              <button
                type="submit"
                className="bg-[#fff] text-[#0C6F89] p-2  rounded-r-lg font-semibold  transition text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-gray-200 text-sm relative z-10">
        © {new Date().getFullYear()} CBT Center. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
