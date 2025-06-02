import React, { useState } from 'react'
import logo from '../../../Assets/desktop-logo.png'
import { Link } from 'react-router-dom'

import './ScrolNav.css'
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown'
function ScrolNav() {
    const [active,setActive] = useState('Home')
  return (
    <div className='ScrolNav'>
      <div className='brand_logo'>
      <Link to={'/Home'}>
          <img src={logo} alt=""  />
        </Link>

      </div>
    
       
      
        <ul className="scrolnav-link-container">
          <li 
            onClick={() => setActive("Home")} 
            className={active === "Home" ? "active" : "in_active"}
          >
            <Link to="/">Home</Link> 
            <hr />
          </li>
          <li 
            onClick={() => setActive("about")} 
            className={active === "about" ? "active" : "in_active"}
          >
            <Link to="/about">About Us</Link> 
            <hr />
          </li>
          
          <li 
            onClick={() => setActive("class-room")} 
            className={active === "class-room" ? "active" : "in_active"}
          >
          
            <Link to="/classroom">Classroom</Link>
           
            <hr />
          </li>

          <li 
            onClick={() => setActive("pricing")} 
            className={active === "pricing" ? "active" : "in_active"}
          >
            <Link to="/pricing">Pricing</Link>
            <hr />
          </li>
          <li 
            onClick={() => setActive("Contact")} 
            className={active === "contact" ? "active" : "in_active"}
          >
            <Link to="/pricing">Contact</Link>
            <hr />
          </li>
          <li 
            onClick={() => setActive("Direct Import")} 
            className={active === "Direct Import" ? "active" : "in_active"}
          >
            <Link to="/blog">Latest News</Link>
            <hr />
          </li>
        </ul>
        <ProfileDropdown/>


    </div>
  )
}

export default ScrolNav