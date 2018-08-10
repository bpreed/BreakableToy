class TeamsController < ApplicationController

  def show
    @team = Team.find(params[:id])
  end

  def new
    if current_user
      @user = User.find(current_user.id)
      @team = Team.new
    end
  end

  def create
    binding.pry
    @user = User.find(current_user.id)
    @team = Team.new(team_params)
    binding.pry
      # name: params[:name], description: params[:description], team_photo: params[:team_photo], created_by: params[:created_by])
    # @team.created_by = @user.id
    if @team.save
      Membership.create(user: @user, team: @team)
      flash[:notice] = "Team added successfully"
      redirect_to teams_path
    else
      @errors = @team.errors.full_messages
      render :new
    end
  end

  private

  def team_params
    params.require(:team).permit(:name, :description, :team_photo, :created_by)
  end

end
