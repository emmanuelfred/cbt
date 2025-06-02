import React from 'react'

function Banner(props) {
  const {title,description} = props
  return (
    <div style={{backgroundColor:'#F8F9F5', padding:'50px 0',height:'60vh',display:'flex',justifyContent:'center',alignItems:'center'}} className='bg-line mb-5 banner'>
        <div className='text-center' style={{height:'90%',width:'90%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} >
        <h3>{title}</h3>
        <h2 >{description}</h2>

        </div>
        
    </div>
  )
}

export default Banner