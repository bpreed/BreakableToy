import { mount } from 'enzyme';
import React from 'react';
import fetchMock from 'fetch-mock';
import EventsIndexContainer from '../../app/javascript/containers/EventsIndexContainer';
import EventTile from '../../app/javascript/components/EventTile';
import EventSearchTile from '../../app/javascript/components/EventSearchTile'

describe('EventsIndexContainerSpec', () => {
  let wrapper;
  let events;

  beforeEach(() => {
    events = [
      {
        Categories: [],
        Distance: 0,
        EventAddress: "940 Main street",
        EventCity: "Gardendale",
        EventDate: "/Date(1535169600000-0400)/",
        EventEndDate: "/Date(1535169600000-0400)/",
        EventId: 36872,
        EventName: "North Jefferson Century",
        EventNotes: null,
        EventPermalink: "http://www.BikeReg.com/36872",
        EventState: "AL",
        EventTypes: ["Recreational"],
        EventUrl: "http://www.BikeReg.com/north-jefferson-century",
        EventWebsite: "http://www.northjeffersoncentury.com",
        EventZip: "35071",
        Latitude: 33.649741,
        Longitude: -86.812177,
        Permit: "",
        PledgeRegUrl: null,
        PresentedBy: "Hamburger Heaven of Gardendale",
        RegCloseDate: "/Date(1534802400000-0400)/",
        RegOpenDate: "/Date(1512281700000-0500)/"
      }
    ]
    fetchMock.post('/api/v1/search/events', {
      status: 200,
      body: events
    });
    wrapper = mount(<EventsIndexContainer />)
  });

  afterEach(fetchMock.restore)

  describe('listing', () => {
    it('renders expected html items', () => {
      expect(wrapper.find('h2')).toBePresent()
    })

    it('renders each event returned from api call', (done) => {
      setTimeout(() => {
        debugger
        expect(wrapper.find('.event-name').text()).toEqual(events[0].EventName)
        expect(wrapper.find('.event-date').text()).toEqual("August 25, 2018")
        expect(wrapper.find('.event-types').text()).toEqual("Recreational")
        done()
      }, 0)
    })
  })
})
