class Api::V1::UsersController < ApplicationController
  def show
    authenticated_user = current_user
    render json: authenticated_user, serializer: UserShowSerializer
  end
end
