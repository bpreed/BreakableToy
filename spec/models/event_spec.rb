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
    date: "Sat, 11 Aug 2018 04:00:00 UTC +00:00",
    reg_open: "Thu, 21 Jun 2018 04:15:00 UTC +00:00",
    reg_close: "Fri, 10 Aug 2018 21:00:00 UTC +00:00",
    bike_reg_id: 123,
    id: 2
  )}

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

    describe 'reg_open' do
      it 'must be present' do
        expect(event).to be_valid
        event.reg_open = nil
        expect(event).to_not be_valid
      end
    end

    describe 'reg_close' do
      it 'must be present' do
        expect(event).to be_valid
        event.reg_close = nil
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

    describe 'latitude' do
      it 'must be present' do
        expect(event).to be_valid
        event.latitude = nil
        expect(event).to_not be_valid
      end
    end

    describe 'longitude' do
      it 'must be present' do
        expect(event).to be_valid
        event.longitude = nil
        expect(event).to_not be_valid
      end
    end
  end
end
