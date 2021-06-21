import React from 'react'
import './Racer.css'

export default function Racer(props) {
  return (
    <div className='racer'>
      <div className='stats' style={{marginLeft:`${props.length}%`}}>
        {props.name} 
        <span style={{display:'block',fontSize:'small'}}>{props.speed}WPM</span>
      </div>
      <div className='length'>
        <div className='length-covered' style={{width:`${props.length}%`}}></div>
      </div>
    </div>
  )
}
