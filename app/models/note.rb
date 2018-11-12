class Note < ApplicationRecord

  validates :body, presence: true

  belongs_to :journey
  belongs_to :user

  mount_uploader :photo_path, NotePhotoUploader
end
