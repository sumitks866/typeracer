import React,{useEffect} from 'react'
import {socket} from '../global/socket'
import './WaitingRoom.css'

export default function WaitingRoom(props) {
  useEffect(() => {
    let roomID = props.roomID
    console.log('roomID for waiting room',roomID)
    // socket.on('room-entry',(username)=>{
    //   //console.log(username,'entered')
    // }) 
    
  }, [])
  return (
    <div className='waiting-room'>
      <button className='ready-btn' onClick={props.handleReadyChange}>Ready ?</button>
    </div>
  )
}
