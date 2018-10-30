require 'pry'
require 'rubygems'
require 'httparty'

class Route
  include HTTParty
  base_uri 'https://api-v3.mbta.com/routes/'
  format :json

  def self.all_routes
    get(base_uri)
  end

  def self.find_by_line(id)
    get(base_uri, :query => {:id => id})
  end

 binding.pry
end
