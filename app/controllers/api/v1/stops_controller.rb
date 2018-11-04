class Api::V1::StopsController < ApplicationController
  def index
    @stops = Stop.where("mbta_id > 0")
    render json: @stops, adapter: :json
  end

  def search
    @stops = Stop.where("name ILIKE ?", "%#{params['search_string']}%")
    render json: @stops
  end
end
