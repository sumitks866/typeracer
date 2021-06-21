import {useEffect} from 'react';
import {Route,Switch, withRouter} from 'react-router-dom'
import './App.css';
import Welcome from './Welcome';
import Typeracer from './Typeracer'
import TyperacerSolo from './TyperacerSolo'
import Scoreboard from './Scoreboard'
import Race from './Race/Race';
import JoinRoom from './Race/JoinRoom';

function App() {
  useEffect(()=>{
    document.title = 'Typeracer'
  },[])
  return (
    <div className="App">
     <Switch>
      <Route exact path="/" render={()=><Welcome/>}/>
      <Route exact path="/playground" render={()=><TyperacerSolo/>}/>
      <Route exact path="/racetrack" render={(routeProps)=><Race {...routeProps}/>}/>
      <Route exact path="/joinroom" render={()=><JoinRoom/>}/>
      <Route exact path="/scoreboard" render={(routeProps)=><Scoreboard {...routeProps}/>}/>
     </Switch>
    </div>
  );
}

export default withRouter(App);
