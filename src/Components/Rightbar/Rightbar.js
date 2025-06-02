import React from 'react'
import { FaCalculator } from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { PiMathOperationsFill } from 'react-icons/pi';
import { BsBookHalf } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import './Rightbar.css'

function Rightbar() {
  return (
    <div className='Rightbar'>
        <ul>
            <li className='Rightbar-tap' >
                <FaCalculator/>
                <span>Calculator</span>
                
            </li>
             <li className='Rightbar-tap' >
                <GiArtificialIntelligence/>
                <span> AI Bot</span>
                
            </li>
             <li className='Rightbar-tap' >
                <BsBookHalf/>
                <span>Dictionary</span>
                
            </li>
             <li className='Rightbar-tap' >
                <PiMathOperationsFill/>
                <span> Repository</span>
                
            </li>
             <li className='Rightbar-tap' >
                <FiSettings/>
                <span>Setting</span>
                
            </li>
        </ul>
    </div>
  )
}

export default Rightbar