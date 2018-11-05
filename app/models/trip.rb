class Trip < ApplicationRecord
  # validates :arrival, uniqueness: true
  belongs_to :journey

  def self.total_trip_time
    (Time.parse(@trip.arrival) - Time.parse(@trip.destination)) / 60
  end
end
