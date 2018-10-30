class Stop < ApplicationRecord
  validates :mbta_id, presence: true
  validates :name, presence: true
end
