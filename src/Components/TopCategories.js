import { useEffect, useState } from 'react';
import Catergory from './Catergory/Catergory'
import AOS from 'aos';

import Skeleton from 'react-loading-skeleton';

function TopCategories() {
  const [loading, setLoading] = useState(true);

useEffect(() => {
  setTimeout(() => setLoading(false), 1000); // fake delay
}, []);
useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false, // ← allows the animation to happen more than once
  });
}, []);

  return (
    <div className='top-categories-container mt-5 container' data-aos="zoom-out">
        <div className='text-center'>
          {loading?(
             <Skeleton height={35} width={'40%'}  />

          ):( <h3>TopCategories</h3>)}
           {loading?(
            <Skeleton width={'70%'} height={50}/>

          ):( <h1>Browse Course With Top Categories</h1>)}
           
            
        </div>
    
    
            <div className=''>
                <Catergory/>
            </div>
            <div className='text-center mt-2 btn-container'>
            {loading?(
            <Skeleton width={'50%'} height={50}/>

          ):( <a href='#' className='reveal-button  '>View All Categories</a>)}
           
               
               
            </div>

    </div>
  )
}

export default TopCategories