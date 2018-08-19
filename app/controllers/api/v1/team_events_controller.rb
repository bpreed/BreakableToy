class Api::V1::TeamEventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    process_team_event(params)
  end

  private

  def date_string_to_obj(date)
    short = date[6, 18]
    date_obj = Time.at(short.to_i/1000)
    return date_obj
  end

  def process_team_event(params)
    event = Event.find_by(bike_reg_id: params[:eventInfo][:EventId])
    if event
      teamEventResult = TeamEvent.where(team_id: params[:teamId], event_id: event.id)
      if teamEventResult.length == 0
        teamEvent = TeamEvent.new(team_id: params[:teamId], event_id: event.id)
        if teamEvent.save
          render json: { teamEvent: teamEvent, result: true }
        else
          render json: { error: teamEvent.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { result: false }
      end
    else
      new_event = Event.new(
                name: params[:eventInfo][:EventName],
                address: params[:eventInfo][:EventAddress],
                city: params[:eventInfo][:EventCity],
                state: params[:eventInfo][:EventState],
                url: params[:eventInfo][:EventUrl],
                latitude: params[:eventInfo][:Latitude],
                longitude: params[:eventInfo][:Longitude],
                date: date_string_to_obj(params[:eventInfo][:EventDate]),
                reg_open: date_string_to_obj(params[:eventInfo][:RegOpenDate]),
                reg_close: date_string_to_obj(params[:eventInfo][:RegCloseDate]),
                bike_reg_id: params[:eventInfo][:EventId]
              )
      new_event.types = params[:eventInfo][:EventTypes]
      if new_event.save
        new_teamEvent = TeamEvent.new(team_id: params[:teamId], event_id: new_event.id)
        if new_teamEvent.save
          render json: { teamEvent: teamEvent, result: true }
        else
          render json: { error: teamEvent.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: new_event.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

end
