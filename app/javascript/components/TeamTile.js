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
      <div className="team-tile-div">
        <div className="team-photo-header-div large-1 small-1">
          <Link to={`teams/${this.props.teamInfo.id}`}>
            <img src={photo} id="team-photo"/>
          </Link>
        </div>
        <div className="team-name-header-div large-3 small-3">
          <Link to={`teams/${this.props.teamInfo.id}`}>
            {name}
          </Link>
        </div>
        <div className="team-description-header-div large-4 small-4">
          {description}
        </div>
        <div className="team-captain-header-div large-2 small-2">
          <Link to={`/users/${captain.username}`} className="team-tile-membership-name">
            <img src={`${captain.profile_photo.url}`} className="team-tile-membership-photo"/>
            {captain.username}
          </Link>
        </div>
        <div className="team-join-header-div large-2 small-2">
          <JoinTeamButton
            teamInfo={this.props.teamInfo}
          />
        </div>
      </div>
    )
  }
}

export default TeamTile;
