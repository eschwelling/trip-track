import React from 'react';
import { Router, browserHistory, Route, IndexRoute, Link } from 'react-router';
import FormMasterComponent from '../components/FormMasterComponent'
import JourneyShow from '../components/JourneyShow'

const App = (props) => {
  return(
    <Router history={browserHistory}>
      <Route path='/users/:id' component={FormMasterComponent}/>
      <Route path='/journeys/:id' component={JourneyShow}/>
    </Router>
  )
}

export default App;
