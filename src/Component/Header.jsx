import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from '../assets/edenites-logo.png';
import moblielogo from '../assets/edenites-favicon.png';
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";
import { useAuthStore } from "../Store/authStore";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {  isAuthenticated } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50" style={{maxWidth:'100%'}}>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/home">
           <img src={logo} alt="edenites technologies" style={{width:130}} className="hidden md:block"/>
           <img src={moblielogo} alt="edenites technologies" style={{width:40}} className="block md:hidden"/>

        </Link>
       

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="home" className="text-gray-700 hover:text-[#0C6F89] font-medium">
            Home
          </Link>
          
          <Link to="home#about" className="text-gray-700 hover:text-[#0C6F89] font-medium">
            About Us
          </Link>
          <Link to="home#why" className="text-gray-700 hover:text-[#0C6F89] font-medium">
            Why Choose Us
          </Link>
          <Link to="courses" className="text-gray-700 hover:text-[#0C6F89] font-medium">
            Courses
          </Link>
          <Link to="start_cbt" className="text-gray-700 hover:text-[#0C6F89] font-medium">
            CBT
          </Link>
          <Link to="blog" className="text-gray-700 hover:text-[#0C6F89] font-medium">
            Blog
          </Link>
        </nav>

      
          {/* Auth Buttons */}
          
        <div className="flex gap-4 items-center">
        
            
            <ProfileDropdown/>

          
        

        
          

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#0C6F89]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
          
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <nav className="flex flex-col items-start space-y-4 px-6 py-4">
            <Link to="#home" className="text-gray-700 hover:text-[#0C6F89] font-medium">
              Home
            </Link>
            <Link to="#blog" className="text-gray-700 hover:text-[#0C6F89] font-medium">
              Blog
            </Link>
            <Link to="#about" className="text-gray-700 hover:text-[#0C6F89] font-medium">
              About Us
            </Link>
            <Link to="#why" className="text-gray-700 hover:text-[#0C6F89] font-medium">
              Why Choose Us
            </Link>
            <Link to="#courses" className="text-gray-700 hover:text-[#0C6F89] font-medium">
              Courses
            </Link>
            <Link to="#cbt" className="text-gray-700 hover:text-[#0C6F89] font-medium">
              CBT
            </Link>
            {!isAuthenticated && (

                <div className="flex flex-col md:flex-row space-x-3 gap-3" style={{width:'100%'}}>
                    <Link
                      to="/login"
                      className="bg-[#0C6F89] hover:bg-[#014925] text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-transparent border-2 border-[#0C6F89] hover:bg-[#0C6F89] text-[#0C6F89] hover:text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
