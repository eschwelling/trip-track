class Line < ApplicationRecord
  include PgSearch
  
  validates :name, presence: true

  has_many :journeys

end
