require 'httparty'

# Loads MBTA lines and stops from the V3 API. Idempotent: each record is
# find_or_create_by mbta_id, so re-running (e.g. on every deploy) is safe and
# also heals a previously interrupted seed run.

base_uri = 'https://api-v3.mbta.com'
api_key = { api_key: ENV["MBTA_KEY"] }.compact

all_lines_external = HTTParty.get("#{base_uri}/routes", query: api_key)

all_lines_external["data"].each do |line|
  line_name = line["attributes"]["long_name"]
  short_name = line["attributes"]["short_name"]
  description = line["attributes"]["description"]
  mbta_id = line["id"]
  # Rapid transit / ferry routes have no short name, which Line validates as
  # required; the app's line picker only offers bus routes, so skip them.
  next if line_name.blank? || short_name.blank? || description.blank?

  Line.find_or_create_by!(mbta_id: mbta_id) do |l|
    l.name = line_name
    l.short_name = short_name
    l.description = description
  end
end
puts "Lines: #{Line.count}"

all_stops_external = HTTParty.get("#{base_uri}/stops", query: api_key)

all_stops_external["data"].each do |stop|
  mbta_id = stop["id"]
  stop_name = stop["attributes"]["name"]
  next if stop_name.blank?

  # Non-numeric MBTA ids (e.g. subway "place-..." stops) cast to 0 in this
  # integer column and the app filters them out with mbta_id > 0, so skip them.
  casted_id = mbta_id.to_i
  next if casted_id.zero?

  Stop.find_or_create_by!(mbta_id: casted_id) do |s|
    s.name = stop_name
    s.description = stop["attributes"]["description"]
    s.address = stop["attributes"]["address"]
    s.latitude = stop["attributes"]["latitude"]
    s.longitude = stop["attributes"]["longitude"]
    s.platform_name = stop["attributes"]["platform_name"]
  end
end
puts "Stops: #{Stop.count}"
