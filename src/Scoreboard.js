import React from 'react'
import querystring from 'query-string'
import {Link} from 'react-router-dom'
import './Scoreboard.css'

export default function Scoreboard(props) {
  const parsed = querystring.parse(props.location.search)
  const speed = parsed['speed'], accuracy = parsed['accuracy'], time = parsed['time']
  
  console.log(time,speed)
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
    <Link to={`/`}><i className="fa fa-home fa-2x"/></Link>
    <Link to={`/playground`}><i className="fas fa-redo fa-2x"/> </Link>
    {/* <i className="fas fa-redo fa-2x" onClick={()=>{setGameOn(true)}}></i> */}
  </div>
 </div>
  )
}
