import {useEffect} from 'react';
import './App.css';
import Welcome from './Welcome';
import Typeracer from './Typeracer'
import Scoreboard from './Scoreboard'

import {Route,Switch} from 'react-router-dom'

function App() {
  useEffect(()=>{
    document.title = 'Typeracer'
  },[])
  return (
    <div className="App">
     <Switch>
      <Route exact path="/" render={()=><Welcome/>}/>
      <Route exact path="/playground" render={()=><Typeracer/>}/>
      <Route exact path="/scoreboard" render={(routeProps)=><Scoreboard {...routeProps}/>}/>
     </Switch>
    </div>
  );
}

export default App;
