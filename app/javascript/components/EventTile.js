import React, { Component } from 'react'
import FavoriteButton from '../components/FavoriteButton'

class EventTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecord: null,
      latitude: null,
      longitude: null,
      weather: {},
      teamAddClicked: false,
      team: null,
      successMessage: null
    }
    this.handleAddTeamClick=this.handleAddTeamClick.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let formPayload = this.props.eventInfo
    fetch('/api/v1/events/events', {
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
      this.setState({ weather: { eventWeatherHigh: body.EventWeatherHigh, eventWeatherLow: body.EventWeatherLow, eventWeatherSummary: body.EventWeatherSummary, eventPrecipProb: body.EventPrecipProb } })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleAddTeamClick(event){
    if (this.state.teamAddClicked) {
      this.setState({ teamAddClicked: false })
    } else {
    this.setState({ teamAddClicked: true })
    }
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let formPayload = {
      teamId: this.state.team,
      eventInfo: this.props.eventInfo
    }
    fetch('/api/v1/team_events', {
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
      if(body.result) {
        this.setState({ teamAddClicked: false, successMessage: "Added!" })
      } else if (body.result == false) {
        this.setState({ teamAddClicked: false, successMessage: "Already added" })
      }
    })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  // Turns event date into object based on string source (external or internal API)
  dateStringToObject(date){
    let date_output = new Date(date)
    if (date.slice(0,5) == "/Date") {
      date = date.substring(6, 19)
      date_output = new Date(parseInt(date))
    }
    return date_output
  }

  // Formats reg start date
  editStartDate(date){
    return this.dateStringToObject(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Formats reg end date
  editRegDate(date){
    return this.dateStringToObject(date).toLocaleString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  render() {

    const { EventId, Distance, EventName, EventCity, EventState, EventAddress, EventDate, EventEndDate, EventUrl, Latitude, Longitude, RegOpenDate, RegCloseDate, EventTypes } = this.props.eventInfo

    let teamAddDiv
    let teamAddDropDown
    if (this.props.activeUser && this.props.activeUser.teams && this.props.activeUser.teams.length > 0 && !this.state.teamAddClicked) {
      teamAddDiv = <div className="add-team-favorite">
                    <a onClick={this.handleAddTeamClick}>
                      Add to team
                    </a>
                  </div>
    } else if (this.props.activeUser && this.props.activeUser.teams && this.props.activeUser.teams.length > 0 && this.state.teamAddClicked) {
      let optionItems = this.props.activeUser.teams.map((team) => {
        return (
          <option value={team.id}>{team.name}</option>
        )
      })
      teamAddDropDown = <div className="add-team-favorite-dropdown">
                          <form className="team-add-form" onSubmit={this.handleSubmit}>
                            <select name='team' value={this.state.team || ''} onChange={this.handleChange}>
                              <option value=''></option>
                              {optionItems}
                            </select>
                            <span className="team-submit-buttons">
                              <a onClick={this.handleAddTeamClick} className="cancel-team-submit-button">
                                Cancel
                              </a>
                              <a onClick={this.handleSubmit} className="add-team-submit-button">
                                Add
                              </a>
                            </span>
                          </form>
                        </div>
    }
    let successDiv
    if (this.state.successMessage) {
      successDiv = <div className="team-add-message">
                    {this.state.successMessage}
                  </div>
    }

    let distanceDiv
    if (Distance && Distance != 0) {
      distanceDiv = `${Distance.toFixed(0)} miles from search`
    } else {
      distanceDiv = ""
    }

    // Displays address field only if present
    let addressDiv;
    let addressURL = ""
    if (EventAddress != "") {
      addressDiv = <div className="event-detail" id="event-address">{EventAddress}</div>
      addressURL = EventAddress.replace(/\s/g, '+') + ','
    }

    // Sets specific event date
    let eventDate = EventDate
    if (typeof eventDate == "string") {
      eventDate = this.editStartDate(EventDate)
    }
    // Sets event registration open date
    let regOpen = RegOpenDate
    if (typeof regOpen == "string") {
      regOpen = this.editRegDate(RegOpenDate)
    }

    // Sets event registration close date
    let regClose = RegCloseDate
    if (typeof regClose == "string") {
      regClose = this.editRegDate(RegCloseDate)
    }

    // Creates string of event types ("Road Race, Recreational", "Recreational, Gravel Grinder", etc)
    let types = EventTypes.join(', ')

    let favoriteButton = null
    if (this.props.activeUser) {
      favoriteButton = <FavoriteButton
        activeUser={this.props.activeUser}
        eventInfo={this.props.eventInfo}
        favoriteRecord={this.state.favoriteRecord}
      />
    }

    return (
      <div className="small-12 event-tile">
        <span className="event-header">
          <div className="event-detail event-types small-9 large-9">
            {types}
          </div>
          <span className="event-detail event-add-buttons small-3 large-3">
            {favoriteButton}
            {teamAddDiv}
            {teamAddDropDown}
            {successDiv}
          </span>
        </span>
        <span className="event-header">
          <div className="event-detail event-name small-9 large-9">{EventName}</div><div className="event-detail event-date small-3 large-3">{eventDate}</div>
        </span>
          <span className="bottom-event-tile">
          <div className="event-detail event-information small-12 large-7">
            {addressDiv}
            <div className="event-detail event-location">
              {EventCity}, {EventState}
            </div>
            <div className="event-detail event-distance">
              {distanceDiv}
            </div>
            <div className="event-detail event-weather">
              <p id="weather-header">Expected weather:</p>
              <div className="event-detail event-weather-summary">
                {this.state.weather.eventWeatherSummary}
              </div>
              <div className="event-detail event-weather-details">
                High: {this.state.weather.eventWeatherHigh}F / Low: {this.state.weather.eventWeatherLow}F / Chance of precipitation: {this.state.weather.eventPrecipProb}%
                <div className="ds-attribution">
                  <a href="https://darksky.net/poweredby/" target="_blank">Forecast powered by Dark Sky</a>
                </div>
              </div>
            </div>
            <div className="event-detail event-url"><a href={`${EventUrl}`} target="blank">
              Event Registration</a>
            </div>
            <div className="event-detail event-reg-open">
              Opens: {regOpen}
            </div>
            <div className="event-detail event-reg-close">
              Closes: {regClose}
            </div>
          </div>
          <div className="event-detail event-map small-5 large-5">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC9RTagiZmsEeP_UMEJK2wdf3ITgb9tcSk&q=${addressURL},${EventCity.replace(/\s/g, '+') + ','},${EventState}`}>
            </iframe>
          </div>
        </span>
      </div>
    )
  }
}

export default EventTile;
