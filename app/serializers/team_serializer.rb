class TeamSerializer < ActiveModel::Serializer
  attributes :name, :description, :captain, :photo, :members, :id, :currentUser

  def photo
    object.team_photo.url
  end

  def members
    object.users
  end

  def currentUser
    if current_user
      current_user
    end
  end
end
