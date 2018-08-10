class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true, uniqueness: true

  mount_uploader :profile_photo, ProfilePhotoUploader

  has_many :favorites
  has_many :events, through: :favorites

  has_many :memberships
  has_many :teams, through: :memberships



  def to_param
    username
  end

  def admin?
    role == "admin"
  end

  def admin_access
    if !user_signed_in || !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to root_path
    end
  end

end
