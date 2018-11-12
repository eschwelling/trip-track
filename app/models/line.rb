class Line < ApplicationRecord
  include PgSearch

  validates :name, :short_name, :description, :mbta_id, :presence => true

  has_many :journeys

end
