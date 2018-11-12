class Journey < ApplicationRecord

  validates :origin, :destination, :line, :direction_id, :presence => true

  belongs_to :origin, :class_name => "Stop"
  belongs_to :destination, :class_name => "Stop"
  belongs_to :line
  belongs_to :user
  has_many :trips
  has_many :notes

end
