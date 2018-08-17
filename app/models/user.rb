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

  def check_avatar(user)
     if user.profile_photo.nil?
       return "/assets/images/user_default.png"
    else
       return user.profile_photo
    end
end

  def admin?
    role == "admin"
  end

  def admin_access
    if !user_signed_in || !current_user.admin?
      flash[:notice] = "You do not have access to that page."
      redirect_to root_path
    end
  end

end
