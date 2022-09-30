
import React,{useState} from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App =()=> {
  const pageSize = 15;

  const[progress,setProgress]=useState(0);
  
  
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}

          />
          <Switch>

            
            <Route exact path="/Entertainment"><News setProgress={setProgress} key="Entertainment" pageSize={pageSize} country="in" category="Entertainment" /></Route>
            <Route exact path="/Health"><News setProgress={setProgress} key="Health" pageSize={pageSize} country="in" category="Health" /></Route>
            <Route exact path="/Science"><News setProgress={setProgress} key="Science" pageSize={pageSize} country="in" category="Science" /></Route>
            <Route exact path="/Sports"><News setProgress={setProgress} key="Sports" pageSize={pageSize} country="in" category="Sports" /></Route>
            <Route exact path="/Technology"><News setProgress={setProgress} key="Technology" pageSize={pageSize} country="in" category="Technology" /></Route>

          </Switch>

        </Router>
      </div>




    )
  
}

export default App;