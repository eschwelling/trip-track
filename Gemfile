source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.3.6'

gem 'rails', '~> 7.2.3', '>= 7.2.3.2'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.5'
# Use Puma as the app server
gem 'puma', '>= 8.0.2'
# Asset pipeline (serves app/assets images; all CSS/JS goes through Vite)
gem 'sprockets-rails'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.11'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.16.0', require: false

# Bundles JS via Vite instead of Webpacker (retired upstream)
gem 'vite_rails', '~> 3.0'

group :development, :test do
  gem 'dotenv-rails'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 4.2'
  gem 'listen', '~> 3.8'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem 'pry-rails'
gem 'rspec-rails', group: [:development, :test]
gem 'capybara', group: [:development, :test]
gem 'launchy', group: [:development, :test]
gem 'factory_bot', group: [:development, :test]
gem 'database_cleaner-active_record', group: [:development, :test]
gem 'valid_attribute', group: [:development, :test]
gem 'shoulda-matchers', '~> 6.0', group: [:development, :test], require: false
gem 'devise', '>= 5.0.4'
gem 'httparty'
gem 'carrierwave', '~> 3.0'
# Backs CarrierWave's S3 storage. Replaces the unmaintained multi-provider
# `fog` umbrella gem, which pulled in ~30 unused cloud-provider adapters.
gem 'fog-aws', '~> 3.20'
gem 'mini_magick', '~> 4.12'
gem 'active_model_serializers', '~> 0.10.14'
gem 'pg_search', '~> 2.3'
