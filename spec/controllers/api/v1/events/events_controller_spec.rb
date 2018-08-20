require "rails_helper"

RSpec.describe Api::V1::Events::EventsController, type: :controller do
  describe "POST#create" do
    xit "should return a single event with lat / long & weather forecast" do
      event = { "EventId"=>39397, "BTId"=>857, "EventName"=>"Tour of Nantucket", "EventAddress"=>"", "EventCity"=>"Siasconset", "EventState"=>"MA", "EventDate"=>"2018-08-12T04:00:00.000Z", "EventUrl"=>"http://www.BikeReg.com/tourofnantucket", "latitude"=>"41.2620995991908", "longitude"=>"-69.9731776711269", "RegOpenDate"=>"2018-07-01T04:15:00.000Z", "RegCloseDate"=>"2018-08-10T16:00:00.000Z", "EventTypes"=>["Road Race"] }

      get :create, params: event
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq event.length + 8
      expect(returned_json["EventLat"]).not_to eq ""
      expect(returned_json["EventWeatherHigh"]).not_to eq ""

    end
  end
end
