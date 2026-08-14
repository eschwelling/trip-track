class NoteSerializer < ActiveModel::Serializer
  attributes :id, :date, :body, :user_id, :photo_path

  # The journey association is omitted: notes are always rendered under the
  # journey being viewed, and serializing it re-queried journeys once per note.

  def date
    timezone = 'Eastern Time (US & Canada)'
    object.created_at.in_time_zone(timezone).strftime("%B %d %y %I:%M%p")
  end
end
