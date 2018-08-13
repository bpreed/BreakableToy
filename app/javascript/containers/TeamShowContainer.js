import React, { Component } from 'react'
import { Link } from 'react-router'
// import TeamTile from '../components/TeamTile'
import EventTile from '../components/EventTile'

class TeamShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team: null,
      currentUserMember: false
    }
  }

  componentDidMount() {
    fetch(`/api/v1/teams/${this.props.params.id}`, {
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
      let currentUserId = body.currentUser.id
      let currentUserMember = false
      body.members.forEach(member => {
        if (member.id == currentUserId) {
          currentUserMember = true
        }
      })
      this.setState({ team: body, currentUserMember: currentUserMember })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    let events
    let teamMembers
    let editTeam
    let teamName
    let teamPhoto
    let captainId
    let upcomingEvents;
    let pastEvents;

    if (this.state.team != null) {

      teamName = this.state.team.name
      teamPhoto = this.state.team.photo
      captainId = this.state.team.captain.id

      teamMembers = this.state.team.members.map((member) => {
        if (member.id == captainId) {
          return (
            <div className="captain-detail">
              <Link to={`/users/${member.username}`}>
                {member.username}
              </Link>
              <div className="captain-label">
                (captain)
              </div>
            </div>
          )
        } else {
          return (
            <div className="member-detail">
              <Link to={`/users/${member.username}`}>
                {member.username}
              </Link>
            </div>
          )
        }
      })

      if (this.state.team.events.length == 0) {
        upcomingEvents = <div className="no-results">No currently favorited upcoming events</div>
      } else {
        upcomingEvents = this.state.team.events.filter(function(bikeEvent) {
          if (bikeEvent["EventDate"] == null || new Date(bikeEvent["EventDate"]) <= new Date()) {
            return false;
          }
          return true;
        }).map((bike_event) => {
          return (
            <EventTile
              key={bike_event.EventId}
              activeUser={this.state.team.currentUser.id}
              eventInfo={bike_event}
            />
          )
        })
        pastEvents = this.state.team.events.filter(function(bikeEvent) {
          if (bikeEvent["EventDate"] == null || new Date(bikeEvent["EventDate"]) > new Date()) {
            return false;
          }
          return true;
        }).map((bike_event) => {
          return (
            <EventTile
            key={bike_event.EventId}
            activeUser={this.state.team.currentUser.id}
            eventInfo={bike_event}
            />
          )
        })
      }

      if (this.state.team.currentUser.id == this.state.team.captain.id) {
        editTeam = <a href={`/teams/${this.props.params.id}/edit`}>Edit Team</a>
      }
    }

    return (
      <div>
        <div id="team-info">
          <h2 className="names-in-rounded-box page-header team-name-header">{teamName}</h2>
          <div className="large-12 medium-12 small-12">
          <div id="edit-team-link">
          {editTeam}
          </div>
          </div>
          <div className="team-profile-photo">
            <img src={teamPhoto}/>
          </div>
          <div className="team-members">
            <div className="members-label">
              Members:
            </div>
            {teamMembers}
          </div>
        </div>
        <div id="team-events">
        <h2 className="names-in-rounded-box page-header">Upcoming Team Member Events</h2>
          <div className="large-12 medium-12 small-12">
            <div className="row events-tiles">
              {upcomingEvents}
            </div>
          </div>
          <h2 className="names-in-rounded-box page-header">Past Team Member Events</h2>
          <div className="large-12 medium-12 small-12">
            <div className="row events-tiles">
              {pastEvents}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default TeamShowContainer;
