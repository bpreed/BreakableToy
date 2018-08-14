class Api::V1::Search::EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    # Creates BikeRegResult poro via HTTParty gem with specified search parameters
    search_string = BikeRegResult.new(
                      states: params[:states],
                      region: params[:region],
                      name: params[:name],
                      eventtype: params[:types],
                      year: params[:year]
                    )
    # Makes outside API call using search parameters
    events = search_string.matching_events
    # Fetch response returns two objects, ResultCount and MatchingEvents
    event_results = []
    events_count = events["ResultCount"]
    events_page = 0
    events_array = events["MatchingEvents"]

    # Adds only upcoming events to array to be returned
    events_array.each do |event|
      next if event["EventDate"] == nil
      date_trim = event["EventDate"][6...19]
      date = Time.at(date_trim.to_i/1000).to_s
      if date > Time.now
        event_results << event
      end
    end

    # If fewer than 30 events in event_results, fetches additional events if available
    while (events_count > ((events_page * 100) + 99)) && (event_results.length < 20)
      events_page += 1
      new_search_string = BikeRegResult.new(
                            states: params[:states],
                            region: params[:region],
                            name: params[:name],
                            eventtype: params[:types],
                            year: params[:year],
                            startpage: events_page
                          )
      new_events = new_search_string.matching_events
      new_events_array = new_events["MatchingEvents"]

      new_events_array.each do |event|
        next if event["EventDate"] == nil
        date_trim = event["EventDate"][6...19]
        date = Time.at(date_trim.to_i/1000).to_s
        if date > Time.now
          event_results << event
        end
      end
    end

    event_results = event_results[0..19].each do |event|
      date_trim = event["EventDate"][6...16]
      geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{event["EventAddress"].gsub(' ', '+')},#{event["EventCity"].gsub(' ', '+')},#{event["EventState"]}&key=AIzaSyAe7LWAeEng4tHXeKuMfYi9VLxvOZl4Ffo"
      geo_data = JSON.parse(open(geocode_url).read)

      event["EventLat"] = geo_data["results"][0]["geometry"]["location"]["lat"]
      event["EventLng"] = geo_data["results"][0]["geometry"]["location"]["lng"]

      date = date_trim[0..9]
      weather_url = "https://api.darksky.net/forecast/472dcf776617a2bddc4edb7095c2547c/#{event["EventLat"]},#{event["EventLng"]},#{date}"

      weather_data = JSON.parse(open(weather_url).read)

      event["EventWeatherHigh"] = weather_data["daily"]["data"][0]["temperatureHigh"]
      event["EventWeatherLow"] = weather_data["daily"]["data"][0]["temperatureLow"]
      event["EventWeatherSummary"] = weather_data["daily"]["data"][0]["summary"]
      event["EventPrecipProb"] = (weather_data["daily"]["data"][0]["precipProbability"] * 100).to_i
    end

    # Checks if user is signed in
    if current_user
      authenticated_user = current_user.id
    else
      authenticated_user = nil
    end
    # Returns found events and results of user check
    render json: { events: event_results, authenticated_user: authenticated_user }
  end

end
