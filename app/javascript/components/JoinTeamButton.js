import React, { Component } from 'react';

class JoinTeamButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
      membershipRecord: null,
      membership: false,
      favoriteCheck: false,
      captainMessage: ""
    }
    this.recordFavorite = this.recordFavorite.bind(this)
  }

  componentDidMount() {
    let formPayload = {
      teamInfo: this.props.teamInfo
    }
    fetch('/api/v1/teams', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(formPayload),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
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
      if(body.membershipRecord) {
        this.setState({ membershipRecord: body.membershipRecord, membership: true, activeUser: body.active_user })
      } else {
        this.setState({ activeUser: body.active_user})
      }
    })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  recordFavorite(event) {
    let membershipId;
    if (this.state.membershipRecord) {
      membershipId = this.state.membershipRecord.id
    } else {
      membershipId = null
    }

    let formPayload = {
      activeUser: this.props.teamInfo.currentUser,
      membershipId: membershipId,
      teamInfo: this.props.teamInfo
    }

    fetch('/api/v1/memberships', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
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
      this.setState({ activeUser: body.activeUser, membershipRecord: body.membershipRecord, membership: body.membership, captainMessage: body.captainMessage })
    })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
   }

  render(){
    let membershipButton = null
    if(this.state.membership == false) {
      membershipButton = <a onClick={this.recordFavorite}>Member<i className="far fa-star"></i></a>
    } else {
      membershipButton = <a onClick={this.recordFavorite}>Member<i className="fas fa-star"></i></a>
    }

    return (
      <div className="event-detail join-button">
        {membershipButton}
        {this.state.captainMessage}
      </div>
    );
  }
}

export default JoinTeamButton;
