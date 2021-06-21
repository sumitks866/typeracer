import React from 'react'
import {Link} from 'react-router-dom'
import './Welcome.css'

export default function Welcome() {
  return (
    <div className='Welcome'>
      <div className='typeracer-text'>
        <h1>TypeRacer</h1>
      </div>
     <div style={{marginRight:'2rem'}}>
      <Link to={`/joinroom`} className='welcome-enter-btn'>Compete</Link>
     </div>
    </div>
  )

}
