CarrierWave.configure do |config|
  # S3 storage is optional: uploaders fall back to :file storage when the
  # AWS credentials are absent (see NotePhotoUploader).
  if ENV["AWS_ACCESS_KEY_ID"].present?
    config.fog_credentials = {
      provider: "AWS",
      aws_access_key_id: ENV["AWS_ACCESS_KEY_ID"],
      aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"]
    }
    if Rails.env.production?
      config.fog_directory  = ENV["S3_BUCKET_PRODUCTION"]
    else
      config.fog_directory  = ENV["S3_BUCKET_DEVELOPMENT"]
    end
  end
end
