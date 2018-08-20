require "rails_helper"

RSpec.describe Api::V1::EventsController, type: :controller do
  describe "POST#create" do
    it "should return favorited as 'nil' when no favorite exists" do

      event1 = FactoryBot.create(:event)
      user1 = FactoryBot.create(:user)

      sign_in user1

      get :create, params: { activeUser: { id: user1.id }, eventInfo: { EventId: event1.id } }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json["favorite"]).to eq nil
      expect(returned_json["active_user"]["id"]).to eq user1.id.to_s
    end

    it "should return favorite record when favorite exists" do

      event1 = FactoryBot.create(:event)
      user1 = FactoryBot.create(:user)
      favorite1 = Favorite.create(user: user1, event: event1)

      sign_in user1

      get :create, params: { activeUser: { id: user1.id }, eventInfo: { EventId: event1.id } }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json["favorite"]["id"]).to eq favorite1.id
      expect(returned_json["active_user"]["id"]).to eq user1.id.to_s
    end
  end
end
