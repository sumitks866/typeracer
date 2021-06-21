import React from 'react'
import "./Wait.css"

export default function Wait(props) {
  return (
    <div className='wait'>
      {props.msg}
    </div>
  )
}
