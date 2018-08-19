require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  describe "GET#show" do
    it "should return a single user & associated events & teams, & currently signed in user" do
      user = FactoryBot.create(:user)

      user2 = FactoryBot.create(:user)

      event = FactoryBot.create(:event)

      favorite = Favorite.create(
        event: event,
        user: user
      )

      authenticated_user = user2

      team = FactoryBot.create(:team, captain: user, created_by: user.id)

      membership = Membership.create(
        team: team,
        user: user
      )

      sign_in user


      get :show, params: { id: user.username}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 7
      expect(returned_json["email"]).to eq user.email
      expect(returned_json["id"]).to eq user.id
      expect(returned_json["username"]).to eq user.username
      expect(returned_json["teams"][0]["name"]).to eq team.name
      expect(returned_json["events"][0]["EventName"]).to eq event.name
      expect(returned_json["authenticated_user"]["username"]).to eq user.username

    end
  end
end
