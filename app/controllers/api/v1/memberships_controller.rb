class Api::V1::MembershipsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    process_membership(params)
  end

  private

  def process_membership(params)
    if params[:membershipId]
      membership = Membership.find(params[:membershipId])
      team = Team.find(params[:teamInfo][:id])
      if team.captain_id == params[:activeUser][:id]
        captain_message = "Captains can't leave team"

        render json: { activeUser: params[:activeUser], membershipRecord: membership, membership: true, captainMessage: captain_message }
      else
        membership.destroy

        render json: { activeUser: params[:activeUser], membershipRecord: nil, membership: false }
      end
    else
      membership = Membership.new(user_id: params[:activeUser][:id], team_id: params[:teamInfo][:id])
      if membership.save
        render json: { activeUser: params[:activeUser], membershipRecord: membership, membership: true }
      else
        render json: { error: new_fav.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end
