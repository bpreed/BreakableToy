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
        name: "Test Event",
        address: "777 Washington St.",
        city: "Waltham",
        state: "MA",
        url: "https://www.google.com",
        latitude: "1",
        longitude: "2",
        date: "2018-08-19T04:15:00.000Z",
        reg_open: "2018-06-02T04:01:00.000Z",
        reg_close: "2018-08-19T03:59:00.000Z",
        types: ["Road Race"],
        bike_reg_id: 123,
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
