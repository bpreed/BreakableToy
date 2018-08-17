import React, { Component } from 'react'
import EventTile from '../components/EventTile'

class UserShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      activeUser: null,
      user: null
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
      this.setState({ events: body.events, user: body, activeUser: body.authenticated_user })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let emailShow = null
    if (this.state.activeUser && (this.state.activeUser.username == this.state.user.username)) {
      emailShow = this.state.user.email
    }
    let upcomingEvents;
    let pastEvents;
    // Displays 'no results' message if no events returned from Fetch
    // Otherwise maps through events, filtering out past events
    if (this.state.events.length == 0) {
      upcomingEvents = <div className="no-results">No currently favorited upcoming events</div>
    } else {
      upcomingEvents = this.state.events.filter(function(bikeEvent) {
        if (bikeEvent["EventDate"] == null || new Date(bikeEvent["EventDate"]) <= new Date()) {
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
      pastEvents = this.state.events.filter(function(bikeEvent) {
        if (bikeEvent["EventDate"] == null || new Date(bikeEvent["EventDate"]) > new Date()) {
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

    let profileInfo;
    if (this.state.user) {
      profileInfo = <div className="profile-div">
        <span className="user-profile-info">
          <img className="user-profile-photo" src={this.state.user.profile_photo.url}/>
          <div className="user-email-username">
            <div className="username">
              {this.state.user.username}
            </div>
            <div className="email">
              {emailShow}
            </div>
            <a className="profile-edit" href={`/users/edit`}>Edit</a>
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
            {upcomingEvents}
          </div>
        </div>
        <h2 className="names-in-rounded-box page-header">My Past Events</h2>
        <div className="large-12 medium-12 small-12">
          <div className="row events-tiles">
            {pastEvents}
          </div>
        </div>
      </div>
    )
  }
}


export default UserShowContainer;
