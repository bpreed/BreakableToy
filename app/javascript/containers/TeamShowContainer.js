import React, { Component } from 'react'
import { Link } from 'react-router'
import JoinTeamButton from '../components/JoinTeamButton'
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
    let teamDescription
    let teamPhoto
    let captainId
    let upcomingEvents;
    let pastEvents;
    let joinButton;

    if (this.state.team != null) {

      joinButton = <JoinTeamButton
                      teamInfo={this.state.team}
                    />
      teamName = this.state.team.name
      teamPhoto = this.state.team.photo
      captainId = this.state.team.captain.id
      teamDescription = this.state.team.description

      teamMembers = this.state.team.members.map((member) => {
        if (member.id == captainId) {
          return (
            <div className="captain-div">
              <span className="captain-detail">
                <Link to={`/users/${member.username}`}>
                  <img src={`${member.profile_photo}`} className="membership-photo"/>
                  {member.username}
                </Link>
                <span className="captain-label">
                  CAPTAIN
                </span>
              </span>
            </div>
          )
        } else {
          return (
            <span className="member-detail">
              <span className='nobr'>
                <Link to={`/users/${member.username}`}>
                  <img src={`${member.profile_photo}`} className="membership-photo"/>
                  <span className="membership-name">
                    {member.username}
                  </span>
                </Link>
              </span>
            </span>
          )
        }
      })

      if (this.state.team.events.length == 0) {
        upcomingEvents = <div className="no-results">No currently favorited upcoming events</div>
        pastEvents = <div className="no-results">No currently favorited past events</div>
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
              activeUser={this.state.team.currentUser}
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
              activeUser={this.state.team.currentUser}
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
          <h2 className="names-in-rounded-box page-header team-name-header">Team {teamName}</h2>
          <div className="large-12 medium-12 small-12">
          <div id="edit-team-link">
          {editTeam}
          </div>
          </div>
          <div id="team-join-button">
          {joinButton}
          </div>
          <div className="team-profile-photo">
            <img src={teamPhoto} className="team-profile-photo-image"/>
          </div>
          <div className="team-show-description">
            <div className="description-label">
              Description:
            </div>
            {teamDescription}
          </div>
          <div className="team-members large-12 medium-12 small-12">
            <div className="members-label">
              Members:
            </div>
            <div className="members-list large-12 medium-12 small-12">
              {teamMembers}
            </div>
          </div>
        </div>
        <div id="team-events">
        <h2 className="names-in-rounded-box page-header">Upcoming Team Events</h2>
          <div className="large-12 medium-12 small-12">
            <div className="row events-tiles">
              {upcomingEvents}
            </div>
          </div>
          <h2 className="names-in-rounded-box page-header">Past Team Events</h2>
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
