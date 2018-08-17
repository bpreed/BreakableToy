import React, { Component } from 'react'
import TeamTile from '../components/TeamTile'
import { Link } from 'react-router'

class TeamsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      teams: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/teams', {
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
      this.setState({ teams: body })
      })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    let teams
    if (this.state.teams) {
      teams = this.state.teams.map((team) => {
        return (
          <TeamTile
            key={team.id}
            teamInfo={team}
          />
        )
      })
    }

    return (
      <div>
        <h2 className="names-in-rounded-box page-header">All Teams</h2>
        <div className="large-12 medium-12 small-12">
          <div id="create-team">
            <a href="/teams/new" className="button">Create A Team</a>
          </div>
          <div className="row teams-tiles">
          <div id="team-index-header" className="small-12 medium-12 large-12">
            <span id="team-index-header-span">
              <div id="team-photo-header-div" className="large-1 small-1"></div>
              <div id="team-name-header-div" className="large-3 small-3">Team</div>
              <div id="team-description-header-div" className="large-4 small-4">Description</div>
              <div id="team-captain-header-div" className="large-2 small-2">Captain</div>
              <div id="team-join-header-div" className="large-2 small-2">Join</div>
            </span>
            <span id="team-index-teams-list">
              {teams}
            </span>
          </div>
          </div>
        </div>
      </div>
    )
  }
}


export default TeamsIndexContainer;
