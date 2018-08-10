class EventsController < ApplicationController
  def index
    @events = Event.all.order(date: :asc)
  end

end
