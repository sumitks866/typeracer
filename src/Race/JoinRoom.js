import React,{useState} from 'react'
import {Redirect,Link} from 'react-router-dom'
import {socket} from '../global/socket'
import './JoinRoom.css'

export default function JoinRoom() {
  const [username, setUsername] = useState('')
  const [roomID, setRoomID] = useState('')
  const [socketID, setSocketID] = useState('')
  const [hasJoined, setHasJoined] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  function joinRoom() {
    if(username===''||roomID==='') {
      return ;
    }
    socket.emit('join',{username,roomID},(message)=>{
      if(message.error) {
        setErrMsg(message.error)
      }else {
        setSocketID(message.socketID)
        setHasJoined(true)
        sessionStorage.setItem('username',username)
        sessionStorage.setItem('roomID',roomID)
        sessionStorage.setItem('socketID',message.socketID)
      }
    })
  }

  if(hasJoined) {
    return (<Redirect to={{pathname:'/racetrack',state:{username:username,roomID:roomID,socketID:socketID}}}/>)
  }

  return (
    <div>
      <div className='join-room'>
        <form>
         <label>
           Username
            <input 
              type='text' 
              name='username' 
              placeholder='Username'
              value={username} 
              autoComplete='off'
              onChange={(evt)=>{setUsername(evt.target.value)}}/>
         </label>
          
          <label>
            Room ID
            <input 
              type='text' 
              name='roomID' 
              value={roomID} 
              placeholder='Enter RoomID or create new Room'
              onChange={(evt)=>{setRoomID(evt.target.value)}}/>
          </label>
          <i className="fas fa-sign-in-alt fa-2x" onClick={joinRoom}></i>
        </form>   
        {errMsg}
    </div>
    <Link to={`/`} style={{ textDecoration: 'none' }}><i className="fa fa-home fa-2x"></i></Link>
    </div>
    
  )
}
