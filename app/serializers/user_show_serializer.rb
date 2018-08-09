class UserShowSerializer < ActiveModel::Serializer
  attributes :username, :id, :email, :events

  has_many :events

  def events
    object.events
  end

end
