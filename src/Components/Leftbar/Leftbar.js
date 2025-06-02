import React from 'react'
import { Link } from 'react-router-dom'
import './Leftbar.css'

function Leftbar() {
  return (
    <ul className='Leftbar'>
        <li>
            <Link>Track Progress</Link>
        </li>
        <li>
            <Link>Take CBT</Link>
        </li>
        <li>
            <Link>Register Course</Link>
        </li>
        <li>
            <Link>Active Course</Link>
        </li>
        <li>
            <Link>Chat Room</Link>
        </li>
        <li>
            <Link>Profile</Link>
        </li>
    </ul>
  )
}

export default Leftbar