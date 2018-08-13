class UserShowSerializer < ActiveModel::Serializer
  attributes :username, :id, :email, :events, :profile_photo

  has_many :events
  has_many :teams

  def events
    object.events.sort_by { |event| event.date}
  end

end
