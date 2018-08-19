require "rails_helper"

RSpec.describe Api::V1::FavoritesController, type: :controller do
  describe "POST#create" do
    it "should create a favorite record when a user favorites an event" do
      user1 = FactoryBot.create(:user)

      event1 = FactoryBot.create(:event)

      get :create, params: { eventInfo: { EventId: event1.id.to_i, EventTypes: [] }, activeUser: { id: user1.id.to_i } }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 3
      expect(returned_json["activeUser"]["id"]).to eq user1.id.to_s
      expect(returned_json["favorited"]).to eq true
      expect(returned_json["favoriteRecord"]["event_id"]).to eq event1.id
      expect(returned_json["favoriteRecord"]["user_id"]).to eq user1.id
    end

    it "should delete a favorite record when a user unfavorites an event" do
      user1 = FactoryBot.create(:user)

      event1 = FactoryBot.create(:event)

      favorite1 = Favorite.create(user: user1, event: event1)

      get :create, params: { favoriteId: favorite1.id, eventInfo: { EventId: event1.id.to_i, EventTypes: [] }, activeUser: { id: user1.id.to_i } }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 3
      expect(returned_json["activeUser"]["id"]).to eq user1.id.to_s
      expect(returned_json["favorited"]).to eq false
      expect(returned_json["favoriteRecord"]).to eq nil
    end
  end
end
