import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import EventsIndexContainer from './containers/EventsIndexContainer'
import UserShowContainer from './containers/UserShowContainer'
import TeamShowContainer from './containers/TeamShowContainer'
import TeamsIndexContainer from './containers/TeamsIndexContainer'
import EventTile from './components/EventTile'

class App extends Component {


  render() {
    // Removes Devise flash message from page
    $(function(){
      var flashDurationInSeconds = 5;
      var flashContainerId = 'flash-messages';

      function removeFlashMessages() {
        $('#' + flashContainerId).remove();
      }

      setTimeout(removeFlashMessages, flashDurationInSeconds * 1000);
    })

    return (
      <Router history={browserHistory}>
        <Route path='/'>
          <IndexRoute component={EventsIndexContainer} />
          <Route path='/events' component={EventsIndexContainer} />
          <Route path='/teams' component={TeamsIndexContainer} />
          <Route path='/teams/:id' component={TeamShowContainer} />
          <Route path='/users/:id' component={UserShowContainer} />
        </Route>
      </Router>
    )
  }
}

export default App;
