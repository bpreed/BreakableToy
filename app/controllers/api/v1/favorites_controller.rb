class Api::V1::FavoritesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    process_favorite(params)
  end

  private

  def process_favorite(params)
    binding.pry
    if params[:favoriteId]
      Favorite.find(params[:favoriteId]).destroy
      render json: { activeUser: params[:activeUser], favoriteRecord: nil, favorited: false }
    else
      result = Favorite.where(event_id: params[:eventInfo][:EventId], user_id: params[:activeUser])
      if result.length == 0
        save_favorite(params)
      else
        render json: { activeUser: params[:activeUser], favoriteRecord: result[0], favorited: true }
      end
    end
  end

  def date_string_to_obj(date)
    short = date[6, 18]
    date_obj = Time.at(short.to_i/1000)
    return date_obj
  end

  def save_favorite(params)
    if !Event.find_by(bike_reg_id: params[:eventInfo][:EventId])

      new_event = Event.new(name: params[:eventInfo][:EventName], address: params[:eventInfo][:EventAddress], city: params[:eventInfo][:EventCity], state: params[:eventInfo][:EventState], url: params[:eventInfo][:EventUrl], latitude: params[:eventInfo][:Latitude], longitude: params[:eventInfo][:Longitude], date: date_string_to_obj(params[:eventInfo][:EventDate]), reg_open: date_string_to_obj(params[:eventInfo][:RegOpenDate]), reg_close: date_string_to_obj(params[:eventInfo][:RegCloseDate]), bike_reg_id: params[:eventInfo][:EventId])

      new_event.types = params[:eventInfo][:EventTypes]

      if new_event.save
        new_fav = Favorite.new(event: new_event, user_id: params[:activeUser])
        if new_fav.save
          render json: { activeUser: params[:activeUser], favoriteId: new_fav.id, favorited: true }
        else
          render json: { error: new_fav.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: new_event.errors.full_messages }, status: :unprocessable_entity
      end
    else
      new_fav = Favorite.new(event: Event.find_by(bike_reg_id: params[:eventInfo][:EventId]), user_id: params[:activeUser])
      if new_fav.save
        render json: { activeUser: params[:activeUser], favoriteRecord: new_fav, favorited: true }
      else
        render json: { error: new_fav.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end
