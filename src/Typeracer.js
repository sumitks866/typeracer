import React, {useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import  './Typeracer.css'
import {socket} from './global/socket'

export default function Typeracer(props) {
  
  const [quote, setQuote] = useState('')
  const [input, setInput] = useState('')
  const [target, setTarget] = useState([{}])
  const [isLoading, setIsLoading] = useState(true)
  const [gameOver, setGameOver] = useState(true)
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

  function getLength() {
    if(quote.length === 0)
      return 0

    let len = 0;
    for(len=0;len<input.length && len<quote.length;len++) {
      if(input[len] !== quote[len]) {
        break
      }
    }
    return parseInt(len*100/quote.length)
  }
  
  useEffect(()=>{
    console.log('quote from server:',props)
    initializeStates()
    async function getQuoteAndGameOn(){
        let respQuote = props.quote
        if(!respQuote){
          const response = await axios.get('http://api.quotable.io/random')
          respQuote = response.data.content
        }        
        setQuote(respQuote)
      }
    getQuoteAndGameOn()
       
  },[])

  useEffect(()=>{
    let quoteArray = quote.split('')
    let chars = quoteArray.map((char)=>{
          return {char:char,color:'white'}
        })
    setTarget(chars)
  },[quote])

  useEffect(()=>{
    setIsLoading(false)
    setInput('')
    setTimer(0)
  },[target])

  useEffect(()=>{
    let interval = null    

    if(gameOver) {
      interval = setInterval(() => {
        setTimer(timer+1)
      }, 1000);
    } else if(!gameOver && timer !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  },[gameOver,timer])
  
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
      const length = getLength()
      if(length) {
        socket.emit('update',{...props,length,speed})
      }
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

  if(!gameOver) {
    let url = `/scoreboard?speed=${speed}&accuracy=${accuracy}&time=${timer}`
    if(props.quote) {
      url = url + '&fromRace=true'
    } else {
      url = url + '&fromRace=false'
    }
    return (<Redirect to={url}/>)
  }

  function handleChange(evt) {
    
    let newLetterCount = letterCount+1
    let newAccuracy = parseInt(getCorrectLetters()*100/newLetterCount)
    setLetterCount(newLetterCount)
    setInput(evt.target.value)
    setAccuracy(newAccuracy)

    if(input.trim() === quote.trim()) {
      setGameOver(false)
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault()
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
      {/* <Link to={`/`} style={{ textDecoration: 'none' }}><i className="fa fa-home fa-2x"></i></Link> */}
    </div>
  )
}

