class UserShowSerializer < ActiveModel::Serializer
  attributes :username, :id, :email, :events, :profile_photo, :authenticated_user

  has_many :events
  has_many :teams

  def events
    object.events.sort_by { |event| event.date}
  end

  def authenticated_user
    authenticated_user = current_user
  end

end
