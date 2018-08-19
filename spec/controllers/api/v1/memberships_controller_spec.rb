require "rails_helper"

RSpec.describe Api::V1::MembershipsController, type: :controller do
  describe "POST#create" do
    it "should create a membership record when a user joins a team" do
      user1 = FactoryBot.create(:user)

      user2 = FactoryBot.create(:user)

      team = FactoryBot.create(:team, created_by: user1.id, captain: user1, id: 1)

      get :create, params: { activeUser: { id: user2.id }, teamInfo: { id: team.id } }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 3
      expect(returned_json["activeUser"]["id"]).to eq user2.id.to_s
      expect(returned_json["membership"]).to eq true
      expect(returned_json["membershipRecord"]["team_id"]).to eq team.id
      expect(returned_json["membershipRecord"]["user_id"]).to eq user2.id
    end

    it "should delete a membership record when a user leaves a team" do
      user1 = FactoryBot.create(:user)

      user2 = FactoryBot.create(:user)

      team = FactoryBot.create(:team, created_by: user1.id, captain: user1)

      membership = Membership.create(
        team: team,
        user: user2,
        id: 2
      )

      get :create, params: { membershipId: 2, activeUser: { id: user2.id }, teamInfo: { id: team.id } }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 3
      expect(returned_json["activeUser"]["id"]).to eq user2.id.to_s
      expect(returned_json["membership"]).to eq false
      expect(returned_json["membershipRecord"]).to eq nil
    end
  end
end
