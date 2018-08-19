require "rails_helper"

# RSpec.describe Api::V1::EventsController, type: :controller do
#   describe "GET#index" do
#     it "should return all events, ordered by date" do
#
#       event1 = FactoryBot.create(:event, date: "Thu, 21 Jun 2018 04:15:00 UTC +00:00")
#       event2 = FactoryBot.create(:event, date: "Fri, 22 Jun 2018 04:15:00 UTC +00:00")
#       event3 = FactoryBot.create(:event, date: "Sat, 23 Jun 2018 04:15:00 UTC +00:00")
#
#
#       get :index
#       returned_json = JSON.parse(response.body)
#
#       expect(response.status).to eq 200
#       expect(response.content_type).to eq("application/json")
#
#       expect(returned_json.length).to eq 2
#       expect(returned_json[0]["name"]).to eq team1.name
#       expect(returned_json[0]["captain"]["username"]).to eq user2.username
#       expect(returned_json[1]["name"]).to eq team2.name
#     end
#   end
# end
