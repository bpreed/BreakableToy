import React, { Component } from 'react'
import { Link } from 'react-router'

class EventTile extends Component {

  editDate = (date) => {
    let date_string = date.substring(6, 19)
    let date_output = new Date(parseInt(date_string))
    return date_output
  }

  render() {
    let addressDiv;
    if (this.props.address != "") {
      addressDiv = <div className="event-detail" id="event-address">{this.props.address}</div>
    }

    let startDateString = this.props.startDate.substring(6, 19)
    let startDateOutput = new Date(parseInt(startDateString))
    let eventDate = startDateOutput.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    let regOpenDateString = this.props.regOpen.substring(6, 19)
    let regOpenDateOutput = new Date(parseInt(regOpenDateString))
    let regOpen = regOpenDateOutput.toLocaleString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    let regCloseDateString = this.props.regClose.substring(6, 19)
    let regCloseDateOutput = new Date(parseInt(regCloseDateString))
    let regClose = regCloseDateOutput.toLocaleString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    let types = this.props.eventTypes.join(', ')


    let favoriteButton
    if(this.props.activeUser == true) {
      favoriteButton = <div className="event-detail favorite-button small-3 large-3">Favorite me!</div>
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
          <div className="event-detail event-name small-9 large-9">{this.props.name}</div><div className="event-detail event-date small-3 large-3">{eventDate}</div>
        </span>
        {addressDiv}
        <div className="event-detail event-location">
          {this.props.city}, {this.props.state}
        </div>
        <div className="event-detail event-url"><a href={`${this.props.url}`}>
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
