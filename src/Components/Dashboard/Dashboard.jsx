import React,{useEffect} from 'react'
import './Dashboard.css'

import RecommendedExams from '../RecommendedExams'
import { useAuthStore } from '../../store/authStore'
import { useCbtstore } from '../../store/cbtStore'

function Dashboard() {
  const {user} = useAuthStore()
  const {getTotalcbt,totalcbt,loading} = useCbtstore();
  
  useEffect(() => {
    if (user && user.name) {
      console.log("Fetching total CBTs for user:", user._id);
      getTotalcbt(user._id);
    }
  }, [user, getTotalcbt]);



  return (
    <div className='min-h-screen p-2 dashboard-container'>
      <div className="user-info-header flex items-center mb-6 gap-4">
        <img src={user.profilePic} alt="" className='profilepic' />
        <div className="user-info">

          <p >Welcome, </p>
          <p>{user.name}</p>         
        </div>

      </div>
      <div className="stat-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6" style={{maxWidth:'100%'}}>
        <div className="w-full max-w-md hover:shadow-md rounded-2xl p-6  bg-[#F8F9F5] flex flex-col items-center justify-center p-2">
          <h4>Total Courses</h4>
          <p>12</p>
      </div>
      <div className="sw-full max-w-md hover:shadow-md rounded-2xl p-6  bg-[#F8F9F5] flex flex-col items-center justify-center p-2">
          <h4>Completed CBT Exams</h4>
          <p>{totalcbt}</p>
      </div>
      <div className="w-full max-w-md hover:shadow-md rounded-2xl p-6  bg-[#F8F9F5] flex flex-col items-center justify-center p-2">
          <h4>Ongoing Courses</h4>
          <p>3</p>
      </div>
      <div className="w-full max-w-md hover:shadow-md rounded-2xl p-6  bg-[#F8F9F5] flex flex-col items-center justify-center p-2 ">
          <h4>Pending Courses</h4>
          <p>1</p>
      </div>
      </div>

      <div className="recommended-cbt">
        <div className="section-head flex justify-between items-center mb-4">
          <h3>Recommended CBT</h3>
          <div className="see-all ">
            <a href="#" >See All</a>
          </div>

        </div>
        <RecommendedExams userId={user} />
      </div>
      <div className="recommended-course">
        <div className="section-head flex justify-between items-center mb-4">
          <h3>Recommended Courses</h3>
          <div className="see-all ">
            <a href="#" >See All</a>
          </div>
        </div>
      
        
        
     
      </div>
      
    </div>
  )
}

export default Dashboard