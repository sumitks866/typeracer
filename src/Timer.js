import React,{useState, useEffect} from 'react'

export default function Timer() {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const timerfunc=setTimeout(() => {
     setTimer(timer+1)
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timerfunc);
  })

  return (
    <div>
      {timer}
    </div>
  )
}
