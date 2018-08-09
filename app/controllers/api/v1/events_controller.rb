class Api::V1::EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Event.all
  end

  def create
    favorited = nil
    if params[:activeUser]
      user = User.find(params[:activeUser])
      event = Event.find_by(bike_reg_id: params[:eventInfo][:EventId])
      if user != nil && event != nil
        if Favorite.where(user: user, event: event).length > 0
          favorited = Favorite.where(user: user, event: event)[0]
        end
      end
    end
    render json: { favorite: favorited, active_user: params[:activeUser] }
  end
end
