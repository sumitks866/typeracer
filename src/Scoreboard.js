import React,{useEffect} from 'react'
import querystring from 'query-string'
import {Link} from 'react-router-dom'
import './Scoreboard.css'
import {socket} from './global/socket'

export default function Scoreboard(props) {
  const parsed = querystring.parse(props.location.search)
  const speed = parsed['speed'], accuracy = parsed['accuracy'], time = parsed['time'], fromRace = parsed['fromRace'] === 'true'

 

  function handleOnHomeClick() {
   if(fromRace) {
    let user = {}
    if(sessionStorage.getItem('username')){
      user.username = sessionStorage.getItem('username')
      user.roomID = sessionStorage.getItem('roomID')
      user.socketID = sessionStorage.getItem('socketID')
      //console.log('getting data from session storage',user)
    }
    if(user) {
      socket.emit('exit-race',user)
      sessionStorage.clear()
    }

   }
  }

  return (
    <div className='score-board'>
      <div className='score-board-params'>
      <div>
        <h1>Speed</h1>
        <h2>{speed}wpm</h2>
    </div>

    <div style={{borderLeft:'1px solid white'}}>
      <h1>Accuracy</h1>
      <h2>{accuracy}%</h2>
    </div>

    <div style={{borderLeft:'1px solid white'}}>
      <h1>Time</h1>
      <h2>{time}s</h2>
    </div>
  </div>
  <div className='score-board-icons'>
    <Link to={`/`}><i className="fa fa-home fa-2x" onClick={handleOnHomeClick}/></Link>
    { fromRace? <Link to={`/racetrack`}><i className="fas fa-redo fa-2x"/> </Link>
      :<Link to={`/playgrounds`}><i className="fas fa-redo fa-2x"/> </Link>}
  </div>
 </div>
  )
}
