# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'pry'
require 'rubygems'
require 'httparty'


base_uri = 'https://api-v3.mbta.com'

all_lines_external = HTTParty.get("#{base_uri}/routes")
all_stops_external = HTTParty.get("#{base_uri}/stops")


all_lines_external["data"].each do |line|
  line_name = line["attributes"]["long_name"]
  short_name = line["attributes"]["short_name"]
  description = line["attributes"]["description"]
  mbta_id = line["id"]
  Line.create!(name: line_name, short_name: short_name, description: description, mbta_id: mbta_id)
end

all_stops_external["data"].each do |stop|
  mbta_id = stop["id"]
  stop_name = stop["attributes"]["name"]
  description = stop["attributes"]["description"]
  address = stop["attributes"]["address"]
  latitude = stop["attributes"]["latitude"]
  longitude = stop["attributes"]["longitude"]
  platform_name = stop["attributes"]["platform_name"]
  Stop.create!(mbta_id: mbta_id, name: stop_name, description: description, address: address, latitude: latitude, longitude: longitude, platform_name: platform_name)
end
