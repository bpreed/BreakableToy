import React, { Component } from 'react'
import { Link } from 'react-router'
import JoinTeamButton from '../components/JoinTeamButton'

class TeamTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { name, description, captain, photo, members } = this.props.teamInfo

    return (
      <div className="small-12 event-tile">
        <span className="team-header">
          <div className="team-detail small-8 large-8">
            <Link to={`/teams/${this.props.teamInfo.id}`} className="team-name">{name}</Link>
            <span className="bottom-team-tile">
              <div className="team-detail team-description">
                {description}
              </div>
              <br />
              <div className="team-detail team-captain">
                <span id="captain">
                  Captain:
                </span>
                <Link to={`/users/${this.props.teamInfo.captain.username}`}>{captain.username}</Link>
              </div>
            </span>
          </div>
          <div className="team-detail team-join-button small-4 large-4">
            <JoinTeamButton
              teamInfo={this.props.teamInfo}
            />
            <div className="team-detail team-photo small-4 large-4">
              <img src={photo} id="team-photo"/>
            </div>
          </div>
        </span>
      </div>
    )
  }
}

export default TeamTile;
