import React, { Component } from 'react'
import { Link } from 'react-router'
import FavoriteButton from '../components/FavoriteButton'
import JoinTeamButton from '../components/JoinTeamButton'

class TeamTile extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    const { name, description, captain, photo, members } = this.props.teamInfo

    let membersList
    let membersDiv
    if (this.props.displayMembers) {
      membersList = members.map((member) => {
        return (
          <div className="member">
            <Link to={`/users/${member.username}`}>
              {member.username}
            </Link><br />
          </div>
        )
      })
      membersDiv = <div className="team-detail team-members">
                    Members:
                    {membersList}
                  </div>
    }

    return (
      <div className="small-12 event-tile">
        <span className="team-header">
          <div className="team-detail small-8 large-8">
            <Link to={`/teams/${this.props.teamInfo.id}`} className="team-name">{name}</Link>
            <span className="bottom-team-tile">
              <div className="team-detail team-description">
                "{description}"
              </div>
              <br />
              <div className="team-detail team-photo small-4 large-4">
                <img src={photo} id="team-photo"/>
              </div>
            </span>
          </div>
          <div className="team-detail team-photo small-4 large-4">
            <JoinTeamButton
              teamInfo={this.props.teamInfo}
            />
            <div className="team-detail team-captain">
              <span id="captain">
                Captain:
              </span>
              <Link to={`/users/${this.props.teamInfo.captain.username}`}>{captain.username}</Link>
            </div>
            {membersDiv}
          </div>
        </span>
      </div>
    )
  }
}

export default TeamTile;
