import React,{useEffect,useState} from 'react'
import {socket} from '../global/socket'

export default function Timer() {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    socket.on('timer-update',(time)=>{
      setTimer(time)
    })
    
    return () => {
      socket.off('timer-update')
    }
  }, [])

  return (
    <div>
      {timer}
    </div>
  )
}
