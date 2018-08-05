class Type < ApplicationRecord

  validates :name, presence: true

  has_many :event_types

end
