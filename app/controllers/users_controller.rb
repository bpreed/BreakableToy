class UsersController < ApplicationController
  before_action :authorize_user

  def show
    @events = nil
    @current_user = nil
    if current_user
      @events = current_user.events
      @current_user = current_user
    end
  end

  private

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "You do not have access to that page."
      redirect_to root_path
    end
  end
end
