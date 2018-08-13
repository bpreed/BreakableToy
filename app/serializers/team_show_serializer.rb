class TeamShowSerializer < ActiveModel::Serializer
  attributes :name, :description, :captain, :photo, :members, :id, :currentUser

  has_many :events
  def photo
    object.team_photo.url
  end

  def members
    members = []

    object.users.each do |member|
      mem = { username: member.username, id: member.id }
      members << mem
    end

    return members
  end

  def currentUser
    if current_user
      current_user
    end
  end
end
