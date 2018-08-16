class UserSerializer < ActiveModel::Serializer
  attributes :username, :id, :profile_photo, :teams

end
