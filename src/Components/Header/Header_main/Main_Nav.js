import React from 'react'
import './Main_Nav.css'
import logo from '../../../Assets/mobile-logo.png'
import { AiOutlineSearch } from "react-icons/ai";
import Explore from '../Expore/Explore';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import Skeleton from 'react-loading-skeleton';
import ImageWithLoading from '..//../ImageWithLoading';
import { Link } from 'react-router-dom';

function Main_Nav({loading}) {
  return (
    <div className='Main_Nav container-fluid'>
        <div className='brand_logo'>
          <Link to={'/'}>
          {loading ? (
              <ImageWithLoading height={70} width={70}/>
              
            ) : (
              <img src={logo} alt="logo" className="logo" />
            )}
          
        </Link>
         
        
           

        </div>
        <div className='center-nav'>
        {loading ? <Skeleton width={100} height={24} /> :  <Explore/>}
           
            {loading ? <Skeleton width={400} height={50} /> : 
            <div className="MainNav-search-container">
              <AiOutlineSearch size={30} color='#15253a' />
              <input type="search" placeholder="What's on you mind" />
            </div>
            }
            
             <Link to="/classroom"> {loading ? <Skeleton width={100} height={24} /> : 'Classroom'}</Link>
            <Link to={'/blog'}> {loading ? <Skeleton width={100} height={24} /> : 'Latest News'}</Link>

        </div>
        <ProfileDropdown loading={loading}/>



        
    </div>
  )
}

export default Main_Nav