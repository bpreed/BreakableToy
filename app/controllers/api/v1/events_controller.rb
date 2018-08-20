class Api::V1::EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    # Checks for logged in user and event already in DB
    # If either is missing, event was never favorited by user; return nil for favorited
    # Else, check for Favorite record and return if found
    favorited = nil
    if params[:activeUser]
      user = User.find(params[:activeUser][:id])
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
