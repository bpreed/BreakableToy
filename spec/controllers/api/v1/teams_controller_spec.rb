require "rails_helper"

RSpec.describe Api::V1::TeamsController, type: :controller do
  describe "GET#index" do
    it "should return all teams, ordered by name" do

      user1 = FactoryBot.create(:user)

      user2 = FactoryBot.create(:user)

      team1 = FactoryBot.create(:team, created_by: user2.id, captain: user2)

      team2 = FactoryBot.create(:team, created_by: user1.id, captain: user1)

      sign_in user1

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json[0]["name"]).to eq team1.name
      expect(returned_json[0]["captain"]["username"]).to eq user2.username
      expect(returned_json[1]["name"]).to eq team2.name
    end
  end

  describe "GET#show" do
    it "should return a single team" do
      user = FactoryBot.create(:user)

      team = FactoryBot.create(:team, captain: user)

      sign_in user

      get :show, params: { id: team.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 8
      expect(returned_json["name"]).to eq team.name
      expect(returned_json["captain"]["username"]).to eq user.username
      expect(returned_json["currentUser"]["username"]).to eq user.username
      expect(returned_json["id"]).to eq team.id
    end
  end

  describe "POST#create" do
    it "should return whether the current user is a member of the team" do
      user = FactoryBot.create(:user)

      team = FactoryBot.create(:team, captain: user, id: "2")

      membership = Membership.create(team: team, user: user)

      sign_in user

      get :create, params: { teamInfo: { id: team.id, currentUser: { id: user.id, username: user.username } } }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json["membershipRecord"]["id"]).to eq membership.id
      expect(returned_json["active_user"]["username"]).to eq user.username
    end
  end
end
