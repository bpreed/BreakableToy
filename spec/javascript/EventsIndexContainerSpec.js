import EventsIndexContainer from '../../app/javascript/containers/EventsIndexContainer';
import EventTile from '../../app/javascript/components/EventTile';
import { mount } from 'enzyme';
import React from 'react';
import fetchMock from 'fetch-mock';

describe('EventsIndexContainerSpec', () => {
  let wrapper;
  let events;

  beforeEach(() => {
    events = [
      {
        EventName: "Test Event",
        EventAddress: "777 Washington St.",
        EventCity: "Waltham",
        EventState: "MA",
        EventUrl: "https://www.google.com",
        Latitude: "1",
        Longitude: "2",
        EventDate: "2018-08-19T04:15:00.000Z",
        RegOpenDate: "2018-06-02T04:01:00.000Z",
        RegCloseDate: "2018-08-19T03:59:00.000Z",
        EventTypes: ["Road Race"],
        EventId: 123,
        id: 2
      }
    ]
    fetchMock.get('/api/v1/events', {
      status: 200,
      body: events
    })
    wrapper = mount(<EventsIndexContainer />)
  });

  afterEach(fetchMock.restore)

  describe('listing', () => {
    it('renders expected html items', () => {
      expect(wrapper.find('h2')).toBePresent()
    })

    it('renders each trail returned from api call', (done) => {
      setTimeout(() => {
        expect(wrapper.find('.event-name').text()).toEqual(events[0].name)
        expect(wrapper.find('.event-date').text()).toEqual("August 19, 2018")
        expect(wrapper.find('.event-types').text()).toEqual("Road Race")
        done()
      }, 0)
    })
  })
})
