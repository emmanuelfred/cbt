import React, { useEffect, useState } from 'react';
import Rightbar from '../Components/Rightbar/Rightbar'
import { useLocation } from 'react-router-dom';
import '../Style/Classroom.css'
import { Link } from 'react-router-dom'
import { MdOutlineViewSidebar } from 'react-icons/md'
import { MdBuild } from 'react-icons/md'; 
import { MdClose } from 'react-icons/md';
import CBTComponent from '../Components/CBTComponent/CBTComponent'
import { FaUser, FaBook, FaCommentDots, FaChartBar, FaEdit } from 'react-icons/fa';
import TakeCBT from '../Components/TakeCBT/TakeCBT';

import PickCourse from '../Components/PickCourse/PickCourse';
import ActiveCourse from '../Components/ActiveCourse/ActiveCourse';
function Classroom() {
  const [isOpenright, setIsOpenright] = React.useState(false);
  const [isOpenleft, setIsOpenleft] = React.useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [component,setComponent] = useState()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page')|| null;

  useEffect(() => {
    switch (page) {
      case 'takeCBT':
        setComponent(<TakeCBT/>);
      
        break;
        case 'ActiveCourse':
          setComponent(<ActiveCourse /> );
       
          break;
      case 'registerCourse':
        setComponent(<PickCourse/> );
     
        break;
      default:
        setComponent(<CBTComponent />);
       
        break;
    }
    
  }, [page]);

  const handleClick = (tabName) => {
    setActiveTab(tabName);
    
  };
  const togglerightbar = () => {
    setIsOpenright(!isOpenright);
     setIsOpenleft(false);
  };

  const toggleleftbar = () => {
    setIsOpenleft(!isOpenleft);
     setIsOpenright(false);
  };
  const handleDisplay = (render)=>{
    setComponent(render)
  }
  const renderComponent = ()=>{
    return component

  }
  return (
    <>
     <div className='classroom-header'>
          <div style={{marginLeft: '20px'}} onClick={toggleleftbar}>
            {isOpenleft ? 
            <>
            <MdClose size={24}/>
            <span>Close</span>
            
            </> :
            <>
            <MdOutlineViewSidebar size={24}/>
            <span>Navigation</span>
            
            </>}
            

          </div>
          <div style={{marginRight: '20px'}} onClick={togglerightbar}>
            {isOpenright ? 
            <>
            <MdClose size={24}/>
            <span>Close</span>
            
            </> :
            <>
             <MdBuild size={24}/>
             <span>Tools</span>
            </>}
           
           

          </div>
        </div>
    <div className='student-page'>
       
      <div className={`leftbar-content ${isOpenleft ? 'openbar' : ''}`}>

         <ul className='Leftbar list-unstyled' onClick={toggleleftbar}>
            <li onClick={() => handleClick('trackProgress')} className={activeTab === 'trackProgress' ? 'active' : ''}>
              <Link to="/classroom?page=dashboard">
                <FaChartBar /> Track Progress
              </Link>
            </li>

            <li onClick={() =>{ handleClick('takeCBT');}} className={activeTab === 'takeCBT' ? 'active' : ''}>
              <Link
                to="/classroom?page=takeCBT"
                
              >
                <span><FaEdit /> Take CBT</span>
                
              </Link>
              
            </li>

            <li onClick={() => {handleClick('registerCourse')}}className={activeTab === 'registerCourse' ? 'active' : ''}>
              <Link to="/classroom?page=registerCourse">
                <FaBook /> Register Course
              </Link>
            </li>
            <li onClick={() => handleClick('activeCourse')} className={activeTab === 'activeCourse' ? 'active' : ''}>
              <Link to="/classroom?page=ActiveCourse">
                <FaBook /> Active Course
              </Link>
            </li>
            <li onClick={() => {handleClick('chatRoom'); handleDisplay('<p>love<p/>') }} className={activeTab === 'chatRoom' ? 'active' : ''}>
              <Link to="#">
                <FaCommentDots /> Chat Room
              </Link>
            </li>
            <li onClick={() => handleClick('profile')} className={activeTab === 'profile' ? 'active' : ''}>
              <Link to="#">
                <FaUser /> Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className='main-content'>
          {
            renderComponent()
          }
          
        </div>
        <div className={'rightbar-content ' + (isOpenright ? 'openbar' : '')}>
            <Rightbar/>
        </div>
    </div>
    </>
    
  )
}

export default Classroom