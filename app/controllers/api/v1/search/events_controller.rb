class Api::V1::Search::EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    search_string = BikeRegResult.new(states: params[:states], region: params[:region], name: params[:name], eventtype: params[:types])
    events = search_string.matching_events
    event_results = events["MatchingEvents"]
    render json: event_results
  end

end
