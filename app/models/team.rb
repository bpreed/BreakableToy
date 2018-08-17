class Team < ApplicationRecord

  mount_uploader :team_photo, TeamPhotoUploader

  validates :name, presence: true
  validates :description, presence: true

  has_many :memberships
  has_many :users, through: :memberships

  belongs_to :captain, class_name: "User"

  has_many :team_events
  has_many :events, through: :team_events

end
