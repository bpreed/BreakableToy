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
      activeUser: null,
      searchInProgress: false,
      pageCount: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.changePageCount = this.changePageCount.bind(this)
  }

  // Sets state based on form fields
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  changePageCount(event) {
    if (event.target.id == "next-button") {
      this.setState({ pageCount: this.state.pageCount + 1 })
    } else if (event.target.id == "past-button") {
      this.setState({ pageCount: this.state.pageCount - 1 })
    }
  }

  // Fetches local API - renders PORO BikeRegResult to set up search params & initiates outside API call
  // returns Events from search result and boolean for active user
  handleSearch(formPayload) {
    this.setState({
      searchInProgress: true
    })
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
      this.setState({ events: body.events, activeUser: body.authenticated_user, searchInProgress: false })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let nextButton
    let pastButton

    if (this.state.events.length > (this.state.pageCount * 5 + 5)) {
      nextButton = <button type="submit" id="next-button" onClick={this.changePageCount} value="Submit">Next</button>
    }

    if (this.state.pageCount > 0) {
      pastButton = <button type="submit" id="past-button" onClick={this.changePageCount} value="Submit">Previous</button>
    }
    let events;
    // Displays 'no results' message if no events returned from Fetch
    // Otherwise maps through events, filtering out past events
    if (this.state.events.length == 0) {
      events = <div className="no-results">No current search results</div>
    } else {
      events = this.state.events.slice((this.state.pageCount * 5), (this.state.pageCount * 5 + 5)).map((bike_event) => {
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
        <h2 className="names-in-rounded-box page-header">Upcoming Bicycle Events</h2>
        <EventSearchTile
          handleSearch={this.handleSearch}
          searchInProgress={this.state.searchInProgress}
        />
        <div className="pagination large-12 medium-12 small-12">
          <span className="row pagination-buttons">
            <div className="past-button-div">
              {pastButton}
            </div>
            <div className="next-button-div">
              {nextButton}
            </div>
          </span>
        </div>
        <div className="large-12 medium-12 small-12" id="search-results-div">
          <div className="row events-tiles">
            {events}
          </div>
        </div>
        <div className="pagination large-12 medium-12 small-12">
          <span className="row bottom-pagination-buttons">
            <div className="past-button-div">
              {pastButton}
            </div>
            <div className="next-button-div">
              {nextButton}
            </div>
          </span>
        </div>
      </div>
    )
  }
}

export default EventsIndexContainer;
