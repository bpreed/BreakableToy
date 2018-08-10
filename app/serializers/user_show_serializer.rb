class UserShowSerializer < ActiveModel::Serializer
  attributes :username, :id, :email, :events, :profile_photo

  has_many :events

  def events
    object.events
  end

end
