class Api::V1::Search::EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    # Creates BikeRegResult poro via HTTParty gem with specified search parameters
    search_string = BikeRegResult.new(states: params[:states], region: params[:region], name: params[:name], eventtype: params[:types], year: params[:year])
    # Makes outside API call using search parameters
    events = search_string.matching_events
    # Fetch response returns two objects, ResultCount and MatchingEvents
    event_results = events["MatchingEvents"]
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
