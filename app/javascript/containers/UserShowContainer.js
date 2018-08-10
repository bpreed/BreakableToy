import React, { Component } from 'react'
import EventTile from '../components/EventTile'

class UserShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      activeUser: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    fetch(`/api/v1/users/${this.props.params.id}`, {
      credentials: 'same-origin'
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
      this.setState({ events: body.events, activeUser: body })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let events;
    // Displays 'no results' message if no events returned from Fetch
    // Otherwise maps through events, filtering out past events
    if (this.state.events.length == 0) {
      events = <div className="no-results">No currently favorited upcoming events</div>
    } else {
      events = this.state.events.filter(function(bikeEvent) {
        if (bikeEvent["EventDate"] == null || new Date(bikeEvent["EventDate"]) < new Date()) {
          return false;
        }
        return true;
      }).map((bike_event) => {
        return (
          <EventTile
            key={bike_event.EventId}
            activeUser={this.state.activeUser.id}
            eventInfo={bike_event}
          />
        )
      })
    }

    let profileInfo;
    if (this.state.activeUser) {
      profileInfo = <div className="profile-div">
        <span className="user-profile-info">
          <img className="user-profile-photo" src={this.state.activeUser.profile_photo.url}/>
          <div className="user-email-username">
            <div className="username">
              {this.state.activeUser.username}
            </div>
            <div className="email">
              {this.state.activeUser.email}
            </div>
            <a className="profile-edit" href={`/users/edit/${this.state.activeUser.username}`}>Edit</a>
          </div>
        </span>
      </div>
    }

    return (
      <div>
        {profileInfo}
        <h2 className="names-in-rounded-box page-header">My Upcoming Events</h2>
        <div className="large-12 medium-12 small-12">
          <div className="row events-tiles">
            {events}
          </div>
        </div>
      </div>
    )
  }
}


export default UserShowContainer;
