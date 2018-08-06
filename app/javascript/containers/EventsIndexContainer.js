import React, { Component } from 'react'
import EventTile from '../components/EventTile'

class EventsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
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
          reg_open={bike_event.reg_open}
          reg_close={bike_event.reg_close}
          event_id={bike_event.bike_reg_id}
          event_types={bike_event.types}
        />
      )
    })

    return (
      <div>
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
