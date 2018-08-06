require 'rails_helper'

RSpec.describe EventType do
  let(:event) do
    Event.new({
    name: 'Sample Event',
    address: '777 Washington St.',
    city: "Waltham",
    state: "MA",
    url: "https://www.google.com",
    latitude: "1",
    longitude: "2",
    date: "2018-08-19T04:15:00.000Z",
    reg_open: "2018-06-02T04:01:00.000Z",
    reg_close: "2018-08-19T03:59:00.000Z",
    bike_reg_id: 123,
    id: 2
  })
  end

  let(:type) do
    Type.new({
      name: 'Road Race'
    })
  end

  let(:eventtype) do
    EventType.new({
      event: event,
      type: type
    })
  end

  describe 'validations' do
    describe 'event ID' do
      it 'must be present' do
        expect(eventtype).to be_valid
        eventtype.event = nil
        expect(eventtype).to_not be_valid
      end
    end

    describe 'type ID' do
      it 'must be present' do
        expect(eventtype).to be_valid
        eventtype.type = nil
        expect(eventtype).to_not be_valid
      end
    end
  end
end
