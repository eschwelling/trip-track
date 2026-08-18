# Journey payload for the commute list, which only renders line, origin and
# destination names. Omits the journey's trips and notes - the full
# JourneySerializer pulled thousands of trip rows per journey to build a
# handful of tiles.
class JourneySummarySerializer < ActiveModel::Serializer
  attributes :id, :origin_id, :destination_id, :line_id, :user_id, :direction_id

  belongs_to :origin
  belongs_to :destination
  belongs_to :line
end
