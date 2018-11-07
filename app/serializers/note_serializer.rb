class NoteSerializer < ActiveModel::Serializer
  attributes :date, :body, :user_id, :photo_path

  belongs_to :journey
  
  def date
    timezone = 'Eastern Time (US & Canada)'
    object.created_at.in_time_zone(timezone).strftime("%B %d %y %I:%M%p")
  end
end
