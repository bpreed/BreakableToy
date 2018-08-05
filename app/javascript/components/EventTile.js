import React, { Component } from 'react'
import { Link } from 'react-router'

class EventTile extends Component {

  render() {
    let addressDiv;
    if (this.props.address != "") {
      addressDiv = <div className="event-detail" id="event-address">{this.props.address}</div>
    }

    let event_date = new Date(this.props.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    let reg_open = new Date(this.props.reg_open).toLocaleString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    let reg_close = new Date(this.props.reg_close).toLocaleString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    let types = this.props.event_types.join(', ')

    return (
      <div className="small-12 event-tile">
        <div className="event-detail event-types">{types}</div>
        <span className="event-header"><div className="event-detail event-name small-9 large-9">{this.props.name}</div><div className="event-detail event-date small-3 large-3">{event_date}</div></span>
        {addressDiv}
        <div className="event-detail event-location">{this.props.city}, {this.props.state}</div>
        <div className="event-detail event-url"><a href={`${this.props.url}`}>Event Registration</a></div>
        <div className="event-detail event-reg-open">Registration opens: {reg_open}</div>
        <div className="event-detail event-reg-close">Registration closes: {reg_close}</div>
      </div>
    )
  }
}

export default EventTile;
