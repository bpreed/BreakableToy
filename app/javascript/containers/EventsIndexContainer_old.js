import React, { Component } from 'react'
import EventTile from '../components/EventTile'
import EventSearchTile from '../components/EventSearchTile'

class EventsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      regionField: '',
      statesField: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSearch(eventsList){
    this.setState({ events: eventsList})
  }

  componentDidMount() {
    fetch('/api/v1/events', {
      credentials: 'same-origin',
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
      this.setState({
        events: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let events = this.state.events.map((bike_event) => {
      return (
        <EventTile
          key={bike_event.id}
          id={bike_event.id}
          name={bike_event.name}
          city={bike_event.city}
          state={bike_event.state}
          name={bike_event.name}
          address={bike_event.address}
          city={bike_event.city}
          state={bike_event.state}
          date={bike_event.date}
          url={bike_event.url}
          latitude={bike_event.latitude}
          longitude={bike_event.longitude}
          regOpen={bike_event.reg_open}
          regClose={bike_event.reg_close}
          eventId={bike_event.bike_reg_id}
          eventTypes={bike_event.types}
        />
      )
    })

    return (
      <div>
      <EventSearchTile
      handlerFunction={this.handleChange}
      handleSearch={this.handleSearch}/>
        <h2 className="names-in-rounded-box page-header">Upcoming Bicycle Events Near Boston, MA</h2>
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
