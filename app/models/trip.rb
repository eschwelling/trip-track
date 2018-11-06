class Trip < ApplicationRecord
  # validates :arrival, uniqueness: true
  belongs_to :journey

end
