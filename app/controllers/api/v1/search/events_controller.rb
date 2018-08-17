class Api::V1::Search::EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    # Creates BikeRegResult poro via HTTParty gem with specified search parameters
    location_string = ""
    if params[:location] != ""
      geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{params[:location].gsub(', ', '+').gsub(',', '+').gsub(' ', '+')}&key=#{ENV["GEOCODE_API"]}"
      geo_data = JSON.parse(open(geocode_url).read)
      lat = geo_data["results"][0]["geometry"]["location"]["lat"]
      lng = geo_data["results"][0]["geometry"]["location"]["lng"]
      location_string = "#{lat}|#{lng}"
    end
    search_string = BikeRegResult.new(
                      states: params[:states],
                      region: params[:region],
                      name: params[:name],
                      eventtype: params[:types],
                      year: params[:year],
                      loc: location_string,
                      distance: params[:distance]
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

    # Checks if user is signed in
    authenticated_user = nil
    if current_user
      authenticated_user = { username: current_user.username, id: current_user.id, profile_photo: current_user.profile_photo, teams: current_user.teams }
    end
    # Returns found events and results of user check
    render json: { events: event_results, authenticated_user: authenticated_user }
  end

end
