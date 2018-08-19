require "rails_helper"

RSpec.describe Api::V1::Search::EventsController, type: :controller do
  # describe "GET#show" do
  #   it "should return a single trail & reviews" do
  #     user = User.create(username: 'Steve', email: 'steve@stphen.com', password: '111111', profile_photo: {url: 'http://www.google.com/0.jpg'})
  #
  #     get :show, params: { id: user.username}
  #     returned_json = JSON.parse(response.body)
  #
  #     expect(response.status).to eq 200
  #     expect(response.content_type).to eq("application/json")
  #
  #     expect(returned_json.length).to eq 2
  #     expect(returned_json["user"]["email"]).to eq user.email
  #     expect(returned_json["user"]["role"]).to eq "member"
  #     expect(returned_json["user"]["id"]).to eq user.id
  #     expect(returned_json["user"]["profile_photo"]["url"]).to eq user.profile_photo.url
  #
  #   end
  # end
end
