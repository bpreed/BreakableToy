class Api::V1::TeamsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authorize_user

  def index
    teams = Team.all.order(name: :asc)
    render json: teams
  end

  def show
    team = Team.find(params[:id])
    render json: team, serializer: TeamShowSerializer
  end

  def create
    membership = nil
    team = Team.find(params[:teamInfo][:id])
    user = User.find(params[:teamInfo][:currentUser][:id])
    if Membership.where(team: team, user: user).length > 0
      membership = Membership.where(team: team, user: user)[0]
    end
    render json: { membershipRecord: membership, active_user: params[:teamInfo][:currentUser] }
  end

  private

  def team_params
    params.require(:team).permit(:name, :description, :team_photo, :created_by)
  end

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "You do not have access to that page."
      redirect_to root_path
    end
  end

end
