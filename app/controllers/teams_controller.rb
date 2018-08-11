class TeamsController < ApplicationController
  before_action :authorize_user

  def index
    @teams = Team.all
    @user = current_user
  end

  def show
    team = Team.find(params[:id])
  end

  def new
    if current_user
      @user = User.find(current_user.id)
      @team = Team.new
    end
  end

  def create
    @user = User.find(current_user.id)
    @team = Team.new(team_params)
    @team.captain_id = @user.id
    if @team.save
      Membership.create(user: @user, team: @team)
      flash[:notice] = "Team added successfully"
      redirect_to teams_path
    else
      errors = team.errors.full_messages
      render :new
    end
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
