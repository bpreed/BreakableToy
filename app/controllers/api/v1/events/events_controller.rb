class Api::V1::Events::EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    event = params

    date_trim = event["EventDate"][6...16]
    geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{event["EventAddress"].gsub(' ', '+')},#{event["EventCity"].gsub(' ', '+')},#{event["EventState"]}&key=#{ENV["GEOCODE_API"]}"
    geo_data = JSON.parse(open(geocode_url).read)

    event["EventLat"] = geo_data["results"][0]["geometry"]["location"]["lat"]
    event["EventLng"] = geo_data["results"][0]["geometry"]["location"]["lng"]
    date_trim = event["EventDate"][6...16]
    date = date_trim[0..9]
    weather_url = "https://api.darksky.net/forecast/#{ENV["WEATHER_API"]}/#{event["EventLat"]},#{event["EventLng"]},#{date}"

    weather_data = JSON.parse(open(weather_url).read)

    event["EventWeatherHigh"] = weather_data["daily"]["data"][0]["temperatureHigh"]
    event["EventWeatherLow"] = weather_data["daily"]["data"][0]["temperatureLow"]
    event["EventWeatherSummary"] = weather_data["daily"]["data"][0]["summary"]
    event["EventPrecipProb"] = (weather_data["daily"]["data"][0]["precipProbability"] * 100).to_i
    # Returns found events and results of user check
    render json: event
  end

end
