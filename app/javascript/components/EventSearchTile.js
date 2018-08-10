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
      year: ''
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
      year: this.state.year
    }
    this.props.handleSearch(formPayload)
  }

  render() {
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
          <h3 id="search-title">Search Criteria</h3>
          <h5 id="search-instructions">All fields optional. Selected region takes precedence over selected state(s).</h5>
            <span className="row search-top-row">
              <div className="region-select large-5 medium-5 small-12">
                Select a region:
                {regionSelect}
              </div>
              <div className="multi-select-states large-5 medium-5 small-12">
                Select state(s):
                <MultiSelectTile
                optionsList={STATES}
                onSelect={this.handleMultiSelect}/>
              </div>
            </span>
            <span className="row search-second-row">
              <div className="year-select large-5 medium-5 small-12">
                Select year (future events if blank):
                {yearSelect}
              </div>
              <div className="multi-select-types large-5 medium-5 small-12">
              Select event type(s):
              <MultiSelectTile
              optionsList={EVENTTYPES}
              onSelect={this.handleMultiSelect}/>
              </div>
            </span>
            <div className="name-search large-5 medium-5 small-12">
              Event Name:
              <input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
            </div>
          <button type="submit" id="search-button" onSubmit={this.handleSubmit} value="Submit">Search</button>
        </form>
      </div>
    )
  }
}
export default EventSearchTile
