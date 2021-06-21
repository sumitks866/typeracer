import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {socket} from '../global/socket'
import Typeracer from '../Typeracer'
import './Race.css'
import Racer from './Racer'
import Wait from './Wait'
import WaitingRoom from './WaitingRoom'
// import Timer from './Timer'

export default function Race(props) {
  const [racers, setRacers] = useState([])
  const [quote, setQuote] = useState('')
  const [loggedIn, setLoggedIn] = useState(true)
  const [userPlayer, setUserPlayer] = useState({})
  const [gotQuote, setGotQuote] = useState(false)
  const [gameOn, setGameOn] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const [readyForGame, setReadyForGame] = useState(false)
  

  useEffect(()=>{
    console.log(props.location.state)
    let user = {}
    if(sessionStorage.getItem('username')){
      user.username = sessionStorage.getItem('username')
      user.roomID = sessionStorage.getItem('roomID')
      user.socketID = sessionStorage.getItem('socketID')
      console.log('getting data from session storage',user)
    }
    else {
      setLoggedIn(false)
    }
    setUserPlayer(user)

    socket.on('readyForGameFlare',(msg)=>{
      setReadyForGame(true)
    })

    socket.on('startGameFlare',(msg)=>{
      setGameOn(true)
    })

    socket.on('endGameFlare',(msg)=>{
    })
    
  },[])

  useEffect(()=>{
    if(quote) {
      setGotQuote(true)
    }
  },[quote])

  useEffect(()=>{
    socket.emit('data-request',userPlayer,(racers_)=>{
      setRacers(racers_)
    })
    socket.emit('quote-request',userPlayer,(quote)=>{
      setQuote(quote)
    })
    socket.on('quote-response',(quote)=>{
      setQuote(quote)
    })
    socket.on('delta',(racers_)=>{
      setRacers(racers_)
    })

    return()=>{
      socket.off('delta')
    }
  },[userPlayer])

  function handleReadyChange() {
    socket.emit('user-ready',userPlayer)
    setPlayerReady(true)
  }

  function handleLogout() {
    socket.emit('exit-race',userPlayer)
    setLoggedIn(false)
    sessionStorage.clear()
  }

  if(!loggedIn) {
    return (<Redirect to={'/joinroom'}/>)
  }

  return (
   <div>
     <div className='exit-wrapper'>
      <button onClick={handleLogout}>Leave Race</button>
     </div>
      <div className='racetrack'>
        {racers.map((racer)=>(
          <Racer name={racer.username} speed={racer.speed} length={racer.length} key={racer.socketID}/>
        ))}
      </div>
      {!readyForGame && !playerReady && <WaitingRoom roomID = {sessionStorage.getItem('roomID')} handleReadyChange={handleReadyChange}/>}
      {playerReady && !readyForGame && <Wait msg='Waiting for other players'/>}
      {readyForGame && !gameOn && <Wait msg= 'Hold On! Race is about to start'/>}
      { gotQuote && gameOn && <Typeracer quote={quote} {...userPlayer}/> }
   </div>
  )
}
