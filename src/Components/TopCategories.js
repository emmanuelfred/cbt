import React from 'react'
import Catergory from './Catergory/Catergory'

function TopCategories() {
  return (
    <div className='top-categories-container mt-5 container'>
        <div className='text-center'>
            <h3>TopCategories</h3>
            <h1>Browse Course With Top Categories</h1>
        </div>
    
    
            <div className=''>
                <Catergory/>
            </div>
            <div className='text-center mt-2 btn-container'>
                <a href='#' className='reveal-button  '>View All Categories</a>
               
            </div>

    </div>
  )
}

export default TopCategories