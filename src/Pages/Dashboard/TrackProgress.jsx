import React,{useEffect} from 'react'
import { useCbtstore } from '../../Store/cbtStore'
import { useAuthStore } from '../../Store/authStore'
import { useCourseStore } from '../../Store/courseStore';
import RecommendedExams from '../../Component/RecommendedExams';
import RecommendedCourses from '../../Component/RecommendedCourses';



function TrackProgress() {
    const {user} = useAuthStore()
  const {getTotalcbt,totalcbt} = useCbtstore();
   const {
    getEnrollmentStats,
    enrollmentStats,
    getActiveEnrollments,
    getExpiredEnrollments,
    getCompletedEnrollments,
    activeEnrollments,
    expiredEnrollments,
    completedEnrollments,
    loading,
  } = useCourseStore();
  console.log( completedEnrollments, activeEnrollments);
    console.log("Enrollment Stats:", enrollmentStats);

  useEffect(() => {
    if (user?._id) {
      getEnrollmentStats(user._id);
      getActiveEnrollments(user._id);
      getExpiredEnrollments(user._id);
      getCompletedEnrollments(user._id);
    }
  }, [user]);
  useEffect(() => {
    if (user && user.name) {
      console.log("Fetching total CBTs for user:", user._id);
      getTotalcbt(user._id);
    }
  }, [user, getTotalcbt]);
  return (
    <>
    <div>
        <div className="stat-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6" style={{maxWidth:'100%'}}>
        <div className="w-full max-w-md hover:shadow-md rounded p-2 md:p-4  bg-white flex flex-col items-center justify-center p-2 border border-gray-300">
          <h4 className='text-gray-700'>Total Courses</h4>
          <p>{enrollmentStats.total_enrolled||0}</p>
      </div>
      <div className="sw-full max-w-md hover:shadow-md rounded p-2 md:p-4  bg-white flex flex-col items-center justify-center p-2 border border-gray-300">
          <h4 className='text-gray-700'>Completed CBT </h4>
          <p>{totalcbt}</p>
      </div>
      <div className="w-full max-w-md hover:shadow-md rounded p-2 md:p-4  bg-white flex flex-col items-center justify-center p-2 border border-gray-300">
          <h4 className='text-gray-700'>Ongoing Courses</h4>
          <p>{enrollmentStats.completed_count||0}</p>
      </div>
      <div className="w-full max-w-md hover:shadow-md rounded p-2 md:p-4  bg-white flex flex-col items-center justify-center p-2 border border-gray-300">
          <h4 className='text-gray-700' >Pending Courses</h4>
          <p>{enrollmentStats.expired_count||0}</p>
      </div>
       <div className="w-full max-w-md hover:shadow-md rounded p-2 md:p-4  bg-white flex flex-col items-center justify-center p-2 border border-gray-300">
          <h4 className='text-gray-700'>Active Courses</h4>
          <p>{enrollmentStats.active_count||0}</p>
      </div>
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
     
    
    </>
    
  )
}

export default TrackProgress