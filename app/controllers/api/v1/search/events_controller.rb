class Api::V1::Search::EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    search_string = BikeRegResult.new(states: params[:states], region: params[:region], name: params[:name], eventtype: params[:types], year: params[:year])
    events = search_string.matching_events
    # if search_string.upcoming_check(events) < 1
    #   new_search_string = BikeRegResult.new(states: params[:states], region: params[:region], name: params[:name], eventtype: params[:types], year: params[:year], startpage: "2")
    #   events = new_search_string.matching_events
    # end
    event_results = events["MatchingEvents"]
    render json: event_results
  end

end
