import React from 'react';
import { Router, browserHistory, Route, IndexRoute, Link } from 'react-router';
import FormMasterComponent from '../components/FormMasterComponent'
import JourneyShow from '../components/JourneyShow'
import NavBar from './NavBar'

const App = (props) => {
  // let userId = current_user.id
  return(
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path ='/home' component={NavBar}>
        <IndexRoute component={FormMasterComponent}/>
          <Route path='/journeys/:id' component={JourneyShow}/>
      </Route>
      {props.children}
    </Router>
  )
}

export default App;
