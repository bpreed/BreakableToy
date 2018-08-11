import React, { Component } from 'react'
import TeamTile from '../components/TeamTile'
import { Link } from 'react-router'

class TeamsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      currentUser: null,
      message: ""
    }
  }

  componentDidMount() {
    fetch(`/api/v1/users/${this.props.params.id}/teams`, {
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
      debugger
      if (body.message) {
        debugger

        this.setState({ message: body.message, currentUser: body.current_user })
      } else if (body.teams) {
        debugger

        this.setState({ teams: body.teams })
      } else {
        debugger

        this.setState({ user: body })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {

    debugger

    let teams;
    let profileInfo;
    if (this.state.user != null) {
      debugger

      const { username, url, email } = this.state.user.current_user
      profileInfo = <div className="profile-div">
        <span className="user-profile-info">
          <img className="user-profile-photo" src={url}/>
          <div className="user-email-username">
            <div className="username">
              {username}
            </div>
            <div className="email">
              {email}
            </div>
          </div>
        </span>
        <h2 className="names-in-rounded-box page-header">My Teams</h2>
        <div className="create-join-team-links">
          <a href="/teams/new" className="create-team">Create Team</a>
          <br />
          <a href="/teams" className="join-team">Join Team</a>
        </div>
      </div>
      if (this.state.user.teams.length == 0) {
        teams = <div className="no-results">You are not currently a member of any teams</div>
      } else {
        teams = this.state.user.teams.map((team) => {
          return (
            <TeamTile
              key={team.id}
              user={this.state.user}
              teamInfo={team}
            />
          )
        })
      }
    } else if (this.state.teams) {
      debugger
      teams = this.state.teams.map((team) => {
        return (
          <TeamTile
            key={team.id}
            teamInfo={team}
          />
        )
      })
    }

    let errorMessage
    if (this.state.message) {
      errorMessage = <div className="other-user-profile">
        {this.state.message}
      </div>
    }

    return (
      <div>
        {profileInfo}
        {errorMessage}
        <div className="large-12 medium-12 small-12">
          <div className="row teams-tiles">
            {teams}
          </div>
        </div>
      </div>
    )
  }
}


export default TeamsIndexContainer;
