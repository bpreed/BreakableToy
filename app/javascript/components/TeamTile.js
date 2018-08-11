import React, { Component } from 'react'
import { Link } from 'react-router'
import FavoriteButton from '../components/FavoriteButton'

class TeamTile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {

    const { name, description, captain } = this.props.teamInfo

debugger

    return (
      <div className="small-12 event-tile">
        <span className="team-header">
          <div className="team-detail team-name small-9 large-9">
            <Link to={`/teams/${this.props.teamInfo.id}`}>{name}</Link>
            <div className="team-detail team-captain">
              Team Captain: <Link to={`/users/${this.props.teamInfo.captain.username}`}>{captain.username}</Link>
            </div>
          </div>
        </span>
        <span className="bottom-team-tile">
          <div className="team-detail team-name small-7 large-7">
            <div className="team-detail team-description">
              "{description}"
            </div>
          </div>
        </span>
      </div>
    )
  }
}

export default TeamTile;
