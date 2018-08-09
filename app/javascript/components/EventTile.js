import React, { Component } from 'react'
import FavoriteButton from '../components/FavoriteButton'

class EventTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecord: null
    }
  }

  // Turns event date into object based on string source (external or internal API)
  dateStringToObject(date){
    let date_output = new Date(date)
    if (date.slice(0,5) == "/Date") {
      date = date.substring(6, 19)
      date_output = new Date(parseInt(date))
    }

    return date_output
  }
  // Formats reg start date
  editStartDate(date){
    return this.dateStringToObject(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Formats reg end date
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
    let eventDate = EventDate
    if (typeof eventDate == "string") {
      eventDate = this.editStartDate(EventDate)
    }
    // Sets event registration open date
    let regOpen = RegOpenDate
    if (typeof regOpen == "string") {
      regOpen = this.editRegDate(RegOpenDate)
    }

    // Sets event registration close date
    let regClose = RegCloseDate
    if (typeof regClose == "string") {
      regClose = this.editRegDate(RegCloseDate)
    }
    
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
