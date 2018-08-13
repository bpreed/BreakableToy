import React, { Component } from 'react'
import TeamTile from '../components/TeamTile'
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
    let teamDiv
    let events
    let editTeam
    let teamName
    if (this.state.team != null) {
      teamName = this.state.team.name
      teamDiv = <TeamTile
                  teamInfo={this.state.team}
                  displayMembers={true}
                />
      events = this.state.team.events.map((bike_event) => {
        return (
          <EventTile
            key={bike_event.EventId}
            activeUser={this.state.team.currentUser.id}
            eventInfo={bike_event}
          />
        )
      })
      if (this.state.team.currentUser.id == this.state.team.captain.id) {
        editTeam = <a href={`/teams/${this.props.params.id}/edit`}>Edit Team</a>
      }
    }

    return (
      <div>
        <div id="team-info">
        <h2 className="names-in-rounded-box page-header">{teamName}</h2>
          <div className="large-12 medium-12 small-12">
            <div className="row teams-tiles">
              {teamDiv}
            </div>
            <div id="edit-team-link">
              {editTeam}
            </div>
          </div>
        </div>
        <div id="team-events">
        <h2 className="names-in-rounded-box page-header">Team Events</h2>
          <div className="large-12 medium-12 small-12">
            <div className="row events-tiles">
              {events}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default TeamShowContainer;
