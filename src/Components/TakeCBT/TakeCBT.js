import React from 'react'


function TakeCBT() {
  return (
    <div className='TakeCBT'>
        <div style={{textAlign:'right'}}>
            <button
                
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#20537c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    
                }}
                >
                    start test
            </button>
        </div>
        <div className=''>
            <div className='user_info'>
                <img/>
                <h3>John Smith</h3>
            </div>
            <div className='exam_info'>

            </div>

        </div>
    </div>
  )
}

export default TakeCBT