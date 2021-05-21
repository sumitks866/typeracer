import React, {useState,useEffect} from 'react'
import axios from 'axios'
import  './Typeracer.css'
import {Link, Redirect} from 'react-router-dom'

export default function Typeracer() {
  
  const [quote, setQuote] = useState('')
  const [input, setInput] = useState('')
  // const [word, setWord] = useState('')
  const [target, setTarget] = useState([{}])
  const [isLoading, setIsLoading] = useState(true)
  const [gameOn, setGameOn] = useState(true)
  const [correct, setCorrect] = useState(true)
  const [timer, setTimer] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [letterCount, setLetterCount] = useState(0)

  function initializeStates() {
    setQuote('')
    setInput('')
    setTarget([])
    setIsLoading(true)
    setCorrect(true)
    setTimer(0)
    setSpeed(0)
    setAccuracy(100)
    setLetterCount(0)
  }

  useEffect(()=>{
    initializeStates()
    async function getQuoteAndGameOn(){
        console.log('getQuote called')
        const response = await axios.get('http://api.quotable.io/random')
        setQuote(response.data.content)
        let quoteArray = response.data.content.split('')
        let chars = quoteArray.map((char)=>{
          return {char:char,color:'white'}
        })
        console.log(response.data.content)
        setTarget(chars)
        setIsLoading(false)
        setInput('')
        setTimer(0)
      }
      getQuoteAndGameOn()
    },[]
  )

  useEffect(()=>{
    let interval = null
    if(gameOn) {
      interval = setInterval(() => {
        setTimer(timer+1)
      }, 1000);
    } else if(!gameOn && timer !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  },[gameOn,timer])
  
  useEffect(()=>{ 
    if(input.length > target.length) {
      return ;
    }
    let newTarget = target
    for(let i=input.length;i<target.length ;i++) {
      target[i].color = 'white'
    } 

    if(input.length === 0) {
      setTarget(newTarget)
      return ;
    }

    if(input !== quote.substring(0,input.length)) {
      setCorrect(false)
      newTarget[input.length-1].color = '#ff8787'
    }else {
      const speed = parseInt((input.length/5)/(timer/60))
      setSpeed(speed)
      setCorrect(true)
      newTarget[input.length-1].color = '#adff4f'
    }
    setTarget(newTarget)

  },[input])
  
  function getCorrectLetters() {
    let res = 0;
    for(let i=0;i<target.length; i++) {
      if(target[i].color === '#adff4f') {
        res+=1
      }
    }
    return res;
  }

  function handleChange(evt) {
    
    let newLetterCount = letterCount+1
    let newAccuracy = parseInt(getCorrectLetters()*100/newLetterCount)
    setLetterCount(newLetterCount)
    setInput(evt.target.value)
    setAccuracy(newAccuracy)

    if(input.trim() === quote.trim()) {
      setGameOn(false)
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault()
  }

  if(!gameOn) {
    const url = `/scoreboard?speed=${speed}&accuracy=${accuracy}&time=${timer}`
    return (<Redirect to={url}/>)
  }

  return isLoading?(
    <div className='typeracer-loading'>
      <div className="lds-ripple"><div></div><div></div><div></div></div>
    </div>
  ):(
    <div className='typeracer'>
      <nav>{timer}</nav>
      <div className='typeracer-playground'>
        <div className='params'>
          <h3>Speed: {speed} wpm</h3>
          <h3>Accuracy: {accuracy} %</h3>
        </div>
        <h2>{target.map((c)=>{
          return <span style={{color:c.color}}>{c.char}</span>
        })}</h2>
        <form onSubmit={handleSubmit}>
          <input 
            autoFocus
            type='text' 
            name='text' 
            autoComplete='off'
            value={input}
            onChange={handleChange} 
            style={{color:correct?'green':'#d12c2c'}} />
        </form>
      </div>
      <Link to={`/`} style={{ textDecoration: 'none' }}><i className="fa fa-home fa-2x"></i></Link>
    </div>
  )
}

