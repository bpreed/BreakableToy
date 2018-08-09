class UsersController < ApplicationController

  def show
    @events = nil
    @current_user = nil
    if current_user
      @events = current_user.events
      @current_user = current_user
    end
  end
end
