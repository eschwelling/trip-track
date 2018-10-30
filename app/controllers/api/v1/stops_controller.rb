class Api::V1::StopsController < ApplicationController
  def index
    @stops = Stop.all
    render json: @stops, adapter: :json
  end

  def search
    @stops = Stop.where("name ILIKE ?", "%#{params['search_string']}%")
    render json: @stops
  end

end
