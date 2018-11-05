class Note < ApplicationRecord

  belongs_to :journey
  belongs_to :user

  mount_uploader :photo_path, NotePhotoUploader
end
