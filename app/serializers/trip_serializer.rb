class TripSerializer < ActiveModel::Serializer
  attributes :id, :arrival, :departure, :total_trip_time

  # Trips are only ever rendered under a journey the caller already has, so the
  # journey association is omitted - serializing it re-queried journeys once per
  # trip.

  def total_trip_time
    ((Time.parse(object.departure) - Time.parse(object.arrival)) / 60).round(2)
  rescue ArgumentError, TypeError
    nil
  end
end
