class TeamSerializer < ActiveModel::Serializer
  attributes :name, :description, :captain, :photo, :members, :id

  def photo
    object.team_photo.url
  end

  def members
    object.users
  end
end
