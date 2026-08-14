class JourneySerializer < ActiveModel::Serializer
  attributes :id, :origin_id, :destination_id, :line_id, :user_id, :direction_id

  belongs_to :origin
  belongs_to :destination
  belongs_to :line
  belongs_to :user
  has_many :notes

  # Trips are deliberately not embedded here: the journey page fetches them
  # from /api/v1/journeys/:id/trips when it draws the chart, so including them
  # only inflated every journey response.
end
