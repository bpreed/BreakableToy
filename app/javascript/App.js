import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import EventsIndexContainer from './containers/EventsIndexContainer'
import EventTile from './components/EventTile'

class App extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/'>
          <IndexRoute component={EventsIndexContainer} />
          <Route path='/events' component={EventsIndexContainer} />
        </Route>
      </Router>
    )
  }
}

export default App;
