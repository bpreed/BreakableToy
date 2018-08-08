class Api::V1::Search::EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    search_string = BikeRegResult.new(states: params[:states], region: params[:region], name: params[:name], eventtype: params[:types], year: params[:year])
    events = search_string.matching_events
    event_results = events["MatchingEvents"]
    authenticated_user = user_signed_in?
    render json: { events: event_results, authenticated_user: authenticated_user }
  end

end
