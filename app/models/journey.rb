class Journey < ApplicationRecord

  belongs_to :origin, :class_name => "Stop"
  belongs_to :destination, :class_name => "Stop"
  belongs_to :line
  belongs_to :user

end
