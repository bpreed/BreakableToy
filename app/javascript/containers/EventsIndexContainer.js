import React, { Component } from 'react'
import EventTile from '../components/EventTile'
import EventSearchTile from '../components/EventSearchTile'

class EventsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      regionField: '',
      statesField: '',
      activeUser: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    // this.handleFavorite = this.handleFavorite.bind(this)
  }

  // Sets state based on form fields
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Fetches local API - renders PORO BikeRegResult to set up search params & initiates outside API call
  // returns Events from search result and boolean for active user
  handleSearch(formPayload) {
    fetch('/api/v1/search/events', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ events: body.events, activeUser: body.authenticated_user })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  // handleFavorite(event) {
  //
  // }

  render() {
    let events;
    // Displays 'no results' message if no events returned from Fetch
    // Otherwise maps through events, filtering out past events
    if (this.state.events.length == 0) {
      events = <div className="no-results">No current search results</div>
    } else {
      events = this.state.events.filter(function(bikeEvent) {
        let date_string = bikeEvent["EventDate"].substring(6, 19)
        let date = new Date(parseInt(date_string))
        if (bikeEvent["EventDate"] == null || date < new Date()) {
          return false;
        }
        return true;
      }).map((bike_event) => {
        return (
          <EventTile
            key={bike_event.EventId}
            activeUser={this.state.activeUser}
            eventInfo={bike_event}
          />
        )
      })
    }

    return (
      <div>
        <h2 className="names-in-rounded-box page-header">Upcoming Bicycle Events Based On Your Search</h2>
        <EventSearchTile
          handlerFunction={this.handleChange}
          handleSearch={this.handleSearch}
        />
        <div className="large-12 medium-12 small-12">
          <div className="row events-tiles">
            {events}
          </div>
        </div>
      </div>
    )
  }
}

export default EventsIndexContainer;
