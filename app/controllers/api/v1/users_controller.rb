class Api::V1::UsersController < ApplicationController
  before_action :authorize_user

  def show
    user = User.find_by(username: params[:id])
    authenticated_user = current_user
    render json: user, serializer: UserShowSerializer
  end

  private

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "You do not have access to that page."
      redirect_to root_path
    end
  end

end
