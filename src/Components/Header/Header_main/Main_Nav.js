import React from 'react'
import './Main_Nav.css'
import logo from '../../../Assets/mobile-logo.png'
import { AiOutlineSearch } from "react-icons/ai";
import Explore from '../Expore/Explore';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

import { Link } from 'react-router-dom';

function Main_Nav() {
  return (
    <div className='Main_Nav container-fluid'>
        <div className='brand_logo'>
          <Link to={'/'}>
          <img src={logo} alt=""  />
          </Link>
           

        </div>
        <div className='center-nav'>
            <Explore/>
            <div className="MainNav-search-container">
            <AiOutlineSearch size={30} color='#15253a' />
            <input type="search" placeholder="What's on you mind" />
            </div>
             <Link to="/classroom">Classroom</Link>
            <Link to={'/blog'}>Latest News</Link>

        </div>
        <ProfileDropdown/>



        
    </div>
  )
}

export default Main_Nav