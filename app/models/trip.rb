class Trip < ApplicationRecord
  # validates :arrival, uniqueness: true
  validates :arrival, :departure, :presence => true
  belongs_to :journey

end
