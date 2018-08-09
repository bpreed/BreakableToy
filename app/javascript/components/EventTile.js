import React, { Component } from 'react'
import FavoriteButton from '../components/FavoriteButton'

class EventTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecord: null
    }
  }

  // componentDidMount() {
  //   let formPayload = {
  //     activeUser: this.props.activeUser,
  //     eventInfo: this.props.eventInfo
  //   }
  //   fetch('/api/v1/events', {
  //     method: 'POST',
  //     credentials: 'same-origin',
  //     body: JSON.stringify(formPayload),
  //     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
  //   })
  //   .then(response => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         let errorMessage = `${response.status} (${response.statusText})`,
  //             error = new Error(errorMessage);
  //         throw(error);
  //       }
  //     })
  //   .then(response => response.json())
  //   .then(body => {
  //     if (body != null) {
  //       this.setState({ favoriteRecord: body })
  //     }
  //   })
  //    .catch(error => console.error(`Error in fetch: ${error.message}`));
  // }

  // Turns date string into object
  dateStringToObject(date){
    let date_string = date.substring(6, 19)
    let date_output = new Date(parseInt(date_string))
    return date_output
  }
  // Formats start date object
  editStartDate(date){
    return this.dateStringToObject(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Formats event registration date object
  editRegDate(date){
    return this.dateStringToObject(date).toLocaleString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  render() {
    const { EventId, EventName, EventCity, EventState, EventAddress, EventDate, EventEndDate, EventUrl, Latitude, Longitude, RegOpenDate, RegCloseDate, EventTypes } = this.props.eventInfo

    // Displays address field only if present
    let addressDiv;
    if (EventAddress != "") {
      addressDiv = <div className="event-detail" id="event-address">{EventAddress}</div>
    }

    // Sets specific event date
    let eventDate = this.editStartDate(EventDate)
    // Sets event registration open date
    let regOpen = this.editRegDate(RegOpenDate)
    // Sets event registration close date
    let regClose = this.editRegDate(RegCloseDate)
    // Creates string of event types ("Road Race, Recreational", "Recreational, Gravel Grinder", etc)
    let types = EventTypes.join(', ')

    let favoriteButton = null
    if (this.props.activeUser) {
      favoriteButton = <FavoriteButton
        activeUser={this.props.activeUser}
        eventInfo={this.props.eventInfo}
        favoriteRecord={this.state.favoriteRecord}
      />
    }

    return (
      <div className="small-12 event-tile">
        <span className="event-header">
          <div className="event-detail event-types event-name small-9 large-9">
            {types}
          </div>
          {favoriteButton}
        </span>
        <span className="event-header">
          <div className="event-detail event-name small-9 large-9">{EventName}</div><div className="event-detail event-date small-3 large-3">{eventDate}</div>
        </span>
        {addressDiv}
        <div className="event-detail event-location">
          {EventCity}, {EventState}
        </div>
        <div className="event-detail event-url"><a href={`${EventUrl}`}>
          Event Registration</a>
        </div>
        <div className="event-detail event-reg-open">
          Registration opens: {regOpen}
        </div>
        <div className="event-detail event-reg-close">
          Registration closes: {regClose}
        </div>
      </div>
    )
  }
}

export default EventTile;
