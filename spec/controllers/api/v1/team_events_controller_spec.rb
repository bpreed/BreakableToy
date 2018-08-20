require "rails_helper"

RSpec.describe Api::V1::TeamEventsController, type: :controller do
  describe "POST#create" do
    it "should return the TeamEvent record and result True" do
      event = FactoryBot.create(:event, bike_reg_id: 123)

      user = FactoryBot.create(:user)

      team = FactoryBot.create(:team, created_by: user.id, captain: user)

      get :create, params: { teamId: team.id, eventInfo: { EventId: event.bike_reg_id } }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json["teamEvent"]["team_id"]).to eq team.id
      expect(returned_json["teamEvent"]["event_id"]).to eq event.id
      expect(returned_json["result"]).to eq true
    end
  end
end
