require "rails_helper"

RSpec.describe Api::V1::Search::EventsController, type: :controller do
  describe "POST#create" do
    it "should return a list of events based on the search parameters" do

      user1 = FactoryBot.create(:user)

      sign_in user1

      get :create, params: {"states"=>["MA"], "types"=>["Road Race"], "year"=>"", "location"=>"", "distance"=>"", "event"=>{"name"=>"", "types"=>["Road Race"]}}

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json["events"].length).to be < 21
      expect(returned_json["authenticated_user"]["id"]).to eq user1.id

    end
  end
end
