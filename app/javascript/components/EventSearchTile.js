import React, {Component} from 'react';
import MultiSelectTile from './MultiSelectTile'
import { STATES } from '../modules/States'
import { EVENTTYPES } from '../modules/EventTypes'

class EventSearchTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      region: '',
      name: '',
      types: [],
      year: '',
      location: '',
      distance: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleMultiSelect = this.handleMultiSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Sets state based on non-multi-select field input
  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLocationChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Sets state based on multi-select input
  handleMultiSelect(optionsList){
    this.setState(optionsList)
  }

  // Invokes handleSearch function from EventsIndexContainer
  handleSubmit(event){
    event.preventDefault()

    let formPayload = {
      states: this.state.states,
      region: this.state.region,
      name: this.state.name,
      types: this.state.types,
      year: this.state.year,
      location: this.state.location,
      distance: this.state.distance,
    }
    this.props.handleSearch(formPayload)
  }

  render() {
    let inSearchIcon
    if (this.props.searchInProgress) {
      inSearchIcon = <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    } else {
      inSearchIcon = <div className="lds-space"></div>
    }
    // Initializes Year select field
    let yearSelect
    yearSelect = <div>
     <select name='year' value={this.state.year || ''} onChange={this.handleChange}>
       <option value=''></option>
       <option value='2018'>2018</option>
       <option value='2019'>2019</option>
       <option value='2020'>2020</option>
     </select>
   </div>

   // Initializes Region select field
    let regionSelect
    regionSelect = <div>
     <select name='region' value={this.state.region || ''} onChange={this.handleChange}>
       <option value=''></option>
       <option value='Mid Atlantic'>Mid Atlantic</option>
       <option value='Midwest'>Midwest</option>
       <option value='New England'>New England</option>
       <option value='Northeast'>Northeast</option>
       <option value='Northwest'>Northwest</option>
       <option value='Rocky Mountain'>Rocky Mountain</option>
       <option value='South Central'>South Central</option>
       <option value='Southeast'>Southeast</option>
       <option value='Southwest'>Southwest</option>
     </select>
   </div>

    return (
      <div className="large-12 medium-12 small-12 search-tile">
        <form id="search-form" className="search-form" onSubmit={this.handleSubmit}>
          <h3 id="search-title">
            Search Criteria
          </h3>
          <h5 id="search-instructions">
            All fields optional. Selected region overrides location or state criteria.
          </h5>
          <span className="row search-top-row">
            <div className="name-search large-3 medium-3 small-12">
              Event Name:
              <input className="search-input" type='text' name='name' value={this.state.name} onChange={this.handleChange} />
            </div>
            <div className="location-search large-6 medium-6 small-12">
              Near Location:
              <input type='text' name='location' value={this.state.location} onChange={this.handleChange} />
            </div>
            <div className="distance-search large-3 medium-3 small-12">
              Within [X] Miles:
              <input type='text' name='distance' value={this.state.distance} onChange={this.handleChange} />
            </div>
          </span>
          <span className="row search-second-row">
            <div className="year-select large-6 medium-6 small-12">
              Select year (future events if blank):
              {yearSelect}
            </div>
            <div className="multi-select-types large-6 medium-6 small-12">
              Select event type(s):
              <MultiSelectTile
                optionsList={EVENTTYPES}
                onSelect={this.handleMultiSelect}
              />
            </div>
          </span>
          <span className="row search-third-row">
            <div className="region-select large-6 medium-6 small-12">
              Select a region:
              {regionSelect}
            </div>
            <div className="multi-select-states large-6 medium-6 small-12">
              Select state(s):
              <MultiSelectTile
                optionsList={STATES}
                onSelect={this.handleMultiSelect}
              />
            </div>
          </span>
          <span className="row search-fourth-row">
            <p id="search-limit">
              Limited to first 20 results, sorted by date
            </p>
            <button type="submit" id="search-button" onSubmit={this.handleSubmit} value="Submit">Search</button>
            {inSearchIcon}
          </span>
        </form>
      </div>
    )
  }
}
export default EventSearchTile
