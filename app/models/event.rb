class Event < ApplicationRecord

  validates :name, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :url, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :date, presence: true
  validates :reg_open, presence: true
  validates :reg_close, presence: true
  validates :bike_reg_id, presence: true

  has_many :favorites
  has_many :event_types

end
