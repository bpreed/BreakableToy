require 'rails_helper'

RSpec.describe Event do
  let(:event) { Event.new(
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
  ) }

  describe 'validations' do
    describe 'name' do
      it 'must be present' do
        expect(event).to be_valid
        event.name = nil
        expect(event).to_not be_valid
      end
    end

    describe 'city' do
      it 'must be present' do
        expect(event).to be_valid
        event.city = nil
        expect(event).to_not be_valid
      end
    end

    describe 'state' do
      it 'must be present' do
        expect(event).to be_valid
        event.state = nil
        expect(event).to_not be_valid
      end
    end

    describe 'url' do
      it 'must be present' do
        expect(event).to be_valid
        event.url = nil
        expect(event).to_not be_valid
      end
    end

    describe 'date' do
      it 'must be present' do
        expect(event).to be_valid
        event.date = nil
        expect(event).to_not be_valid
      end
    end

    describe 'bike_reg_id' do
      it 'must be present' do
        expect(event).to be_valid
        event.bike_reg_id = nil
        expect(event).to_not be_valid
      end
    end

    describe 'url' do
      it 'must be present' do
        expect(event).to be_valid
        event.url = nil
        expect(event).to_not be_valid
      end
    end
  end
end
