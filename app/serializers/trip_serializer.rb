class TripSerializer < ActiveModel::Serializer
  attributes :id, :arrival, :departure, :journey_id, :total_trip_time

  # belongs_to :journey
  def total_trip_time
    total_time = (Time.parse(object.departure) - Time.parse(object.arrival)) / 60
  end

end
