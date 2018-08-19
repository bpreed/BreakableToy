class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true, uniqueness: true, length: { maximum: 10 }

  mount_uploader :profile_photo, ProfilePhotoUploader

  has_many :favorites
  has_many :events, through: :favorites

  has_many :memberships
  has_many :teams, through: :memberships

  def to_param
   username
  end

end
