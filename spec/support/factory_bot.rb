require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    sequence(:username) { |n| "user#{n}" }
    password 'password'
    password_confirmation 'password'
  end

  factory :team do
    sequence(:name) { |n| "Team #{n}" }
    sequence(:description) { |n| "We are team # #{n}!" }
    sequence(:captain) { User.create }
    sequence(:created_by) { |n| "#{n}" }
  end

  factory :event do
    sequence(:name) { |n| "Team #{n}" }
    sequence(:address) { |n| "#{n} Main Street" }
    sequence(:city) { "Boston" }
    sequence(:state) { "MA" }
    sequence(:url) { |n| "http://www.google.com/#{n}" }
    sequence(:latitude) { |n| "#{n}" }
    sequence(:longitude) { |n| "#{n}" }
    sequence(:date) { |n| "Sat, #{n} Aug 2018 04:00:00 UTC +00:00" }
    sequence(:reg_open) { |n| "Thu, #{n} Jun 2018 04:15:00 UTC +00:00" }
    sequence(:reg_close) { |n| "Fri, #{n} Aug 2018 21:00:00 UTC +00:00" }
    sequence(:bike_reg_id) { |n| "#{n}" }
  end

end
