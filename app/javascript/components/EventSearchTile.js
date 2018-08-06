import React, {Component} from 'react';
import MultiSelectTile from './MultiSelectTile'

const STATES = [
  {id: "AL", label: "Alabama"},
  {id: "AK", label: "Alaska"},
  {id: "AZ", label: "Arizona"},
  {id: "AR", label: "Arkansas"},
  {id: "CA", label: "California"},
  {id: "CO", label: "Colorado"},
  {id: "CT", label: "Connecticut"},
  {id: "DE", label: "Delaware"},
  {id: "DC", label: "District Of Columbia"},
  {id: "FL", label: "Florida"},
  {id: "GA", label: "Georgia"},
  {id: "HI", label: "Hawaii"},
  {id: "ID", label: "Idaho"},
  {id: "IL", label: "Illinois"},
  {id: "IN", label: "Indiana"},
  {id: "IA", label: "Iowa"},
  {id: "KS", label: "Kansas"},
  {id: "KY", label: "Kentucky"},
  {id: "LA", label: "Louisiana"},
  {id: "ME", label: "Maine"},
  {id: "MD", label: "Maryland"},
  {id: "MA", label: "Massachusetts"},
  {id: "MI", label: "Michigan"},
  {id: "MN", label: "Minnesota"},
  {id: "MS", label: "Mississippi"},
  {id: "MO", label: "Missouri"},
  {id: "MT", label: "Montana"},
  {id: "NE", label: "Nebraska"},
  {id: "NV", label: "Nevada"},
  {id: "NH", label: "New Hampshire"},
  {id: "NJ", label: "New Jersey"},
  {id: "NM", label: "New Mexico"},
  {id: "NY", label: "New York"},
  {id: "NC", label: "North Carolina"},
  {id: "ND", label: "North Dakota"},
  {id: "OH", label: "Ohio"},
  {id: "OK", label: "Oklahoma"},
  {id: "OR", label: "Oregon"},
  {id: "PA", label: "Pennsylvania"},
  {id: "PR", label: "Puerto Rico"},
  {id: "RI", label: "Rhode Island"},
  {id: "SC", label: "South Carolina"},
  {id: "SD", label: "South Dakota"},
  {id: "TN", label: "Tennessee"},
  {id: "TX", label: "Texas"},
  {id: "UT", label: "Utah"},
  {id: "VT", label: "Vermont"},
  {id: "VA", label: "Virginia"},
  {id: "WA", label: "Washington"},
  {id: "WV", label: "West Virginia"},
  {id: "WI", label: "Wisconsin"},
  {id: "WY", label: "Wyoming"}
];

const TYPES = [
  {id: "Bike Tour", label: "Bike Tour"},
  {id: "Club Membership", label: "Club Membership"},
  {id: "Cycling Camp", label: "Cycling Camp"},
  {id: "Cyclocross", label: "Cyclocross"},
  {id: "Fat Bike", label: "Fat Bike"},
  {id: "Gran Fondo", label: "Gran Fondo"},
  {id: "Gravel Grinder", label: "Gravel Grinder"},
  {id: "Hill Climb", label: "Hill Climb"},
  {id: "Multisport", label: "Multisport"},
  {id: "Off Road", label: "Off Road"},
  {id: "Recreational", label: "Recreational"},
  {id: "Road Race", label: "Road Race"},
  {id: "Special Event", label: "Special Event"},
  {id: "Time Trial", label: "Time Trial"},
  {id: "Track", label: "Track"}
]

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

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleMultiSelect(optionsList){
    this.setState(optionsList)
  }

  handleSubmit(event){
    event.preventDefault()
    let formPayload = {
      states: this.state.states,
      region: this.state.region,
      name: this.state.name,
      types: this.state.types,
      year: this.state.year
    }
    fetch('/api/v1/search/events', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json'}
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
      {this.props.handleSearch(body)}
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    let yearSelect
    yearSelect = <div>
     <select name='year' value={this.state.year || ''} onChange={this.handleChange}>
       <option value='default'></option>
       <option value='2017'>2017</option>
       <option value='2018'>2018</option>
       <option value='2019'>2019</option>
       <option value='2020'>2020</option>
     </select>
   </div>

    let regionSelect
    regionSelect = <div>
     <select name='region' value={this.state.region || ''} onChange={this.handleChange}>
       <option value='default'></option>
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
      <form id="search-form" className="" onSubmit={this.handleSubmit}>
        <h3>Search</h3>
        <h5>All fields optional. Selected region takes precedence over selected state(s).</h5>
          <span className="region-select">
            Select a region:
            {regionSelect}
          </span>
          <span className="multi-select-states">
            Select state(s):
            <MultiSelectTile
            optionsList={STATES}
            onSelect={this.handleMultiSelect}/>
          </span>
          <span className="multi-select-types">
            Select event type(s):
            <MultiSelectTile
            optionsList={TYPES}
            onSelect={this.handleMultiSelect}/>
          </span>
          <span className="region-select">
            Select year (all future events if blank):
            {yearSelect}
          </span>
          <span className="name-search">
            Event Name:
            <input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
          </span>
        <button type="submit" className="button" onSubmit={this.handleSubmit} value="Submit">Search</button>
      </form>
    )
  }
}
export default EventSearchTile
