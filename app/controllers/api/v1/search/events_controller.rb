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

    # Checks if there are fewer than 100 events in return array and if so, fetches additional events if available
    while events_count > ((events_page * 100) + 99)
      binding.pry
      events_page += 1
      if events_count > 100 && event_results.length < 100
        binding.pry

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
      else
        event_results = event_results[0..99]
        break
      end
    end
    binding.pry

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
