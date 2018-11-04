class Stop < ApplicationRecord
  include PgSearch
  pg_search_scope :search_by_name, :against => :name

  validates :mbta_id, presence: true
  validates :name, presence: true

  has_many :journeys

end
