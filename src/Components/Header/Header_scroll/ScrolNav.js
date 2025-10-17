import React, { useEffect} from 'react'
import logo from '../../../Assets/edenites-logo.png';
import { Link } from 'react-router-dom';

import './ScrolNav.css';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import Skeleton from 'react-loading-skeleton';
import ImageWithLoading from '..//../ImageWithLoading';

function ScrolNav({ active, setActive ,loading}) {
 
  
  return (
    <div className='ScrolNav'>
      <div className='brand_logo'>
        <Link to={'/Home'}>
        {loading ? (
              <ImageWithLoading height={70} width={100}/>
              
            ) : (
              <img src={logo} alt="logo" className="logo" />
            )}
          
        </Link>
      </div>

      <ul className="scrolnav-link-container">
        <li
          onClick={() => setActive("Home")}
          className={active === "Home" ? "active" : "in_active"}
        >
          <Link to="/"> {loading ? <Skeleton width={100} height={24} /> : 'Home'}</Link>
          {loading ? <Skeleton width={70} height={3} /> :  <hr />}
         
        </li>
        <li
          onClick={() => setActive("about")}
          className={active === "about" ? "active" : "in_active"}
        >
          <Link to="/about"> {loading ? <Skeleton width={100} height={24} /> : 'About Us'}</Link>
          {loading ? <Skeleton width={70} height={3} /> :  <hr />}
        </li>
        <li
          onClick={() => setActive("class-room")}
          className={active === "class-room" ? "active" : "in_active"}
        >
          <Link to="/classroom"> {loading ? <Skeleton width={100} height={24} /> : 'Classroom'}</Link>
          {loading ? <Skeleton width={70} height={3} /> :  <hr />}
        </li>
        <li
          onClick={() => setActive("pricing")}
          className={active === "pricing" ? "active" : "in_active"}
        >
          <Link to="/pricing"> {loading ? <Skeleton width={100} height={24} /> : 'Pricing'}</Link>
          {loading ? <Skeleton width={70} height={3} /> :  <hr />}
        </li>
        <li
          onClick={() => setActive("Contact")}
          className={active === "contact" ? "active" : "in_active"}
        >
          <Link to="/contact-us"> {loading ? <Skeleton width={100} height={24} /> : 'Contact'}</Link>
          {loading ? <Skeleton width={70} height={3} /> :  <hr />}
        </li>
        <li
          onClick={() => setActive("Direct Import")}
          className={active === "Direct Import" ? "active" : "in_active"}
        >
          <Link to="/blog"> {loading ? <Skeleton width={100} height={24} /> : 'Latest News'}</Link>
          {loading ? <Skeleton width={70} height={3} /> :  <hr />}
        </li>
      </ul>

      <ProfileDropdown loading={loading} />
    </div>
  );
}

export default ScrolNav;
