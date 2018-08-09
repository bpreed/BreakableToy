import React, { Component } from 'react';

class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
      favoriteRecord: null,
      favorited: false,
      favoriteCheck: false
    }
    this.recordFavorite = this.recordFavorite.bind(this)
  }

  componentDidMount() {
    let formPayload = {
      activeUser: this.props.activeUser,
      eventInfo: this.props.eventInfo
    }
    fetch('/api/v1/events', {
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
      if(body.favorite) {
        this.setState({ favoriteRecord: body.favorite, favorited: true, activeUser: body.active_user })
      } else {
        this.setState({ activeUser: body.active_user})
      }
    })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  recordFavorite(event) {
    let favId;
    if (this.state.favoriteRecord) {
      favId = this.state.favoriteRecord.id
    } else {
      favId = null
    }

    let formPayload = {
      activeUser: this.props.activeUser,
      favoriteId: favId,
      eventInfo: this.props.eventInfo
    }

    fetch('/api/v1/favorites', {
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
      this.setState({ activeUser: body.activeUser, favoriteRecord: body.favoriteRecord, favorited: body.favorited})
    })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
   }

  render(){
    // Displays add-to-favorites button if user is logged in
    // Displays messages based on favorited or not
    let favoriteButton = null
    if(this.state.favorited == false) {
      favoriteButton = <a onClick={this.recordFavorite}>Favorite me!</a>
    } else {
      favoriteButton = <a onClick={this.recordFavorite}>Favorited<i className="fas fa-star"></i></a>
    }
    return (
      <div className="event-detail favorite-button small-3 large-3">
        {favoriteButton}
      </div>
    );
  }
}

export default FavoriteButton;
