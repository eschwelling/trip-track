class JourneySerializer < ActiveModel::Serializer
  attributes :id, :origin_id, :destination_id, :line_id, :user_id, :direction_id

  belongs_to :origin, :class_name => "Stop"
  belongs_to :destination, :class_name => "Stop"
  belongs_to :line
  belongs_to :user

end
