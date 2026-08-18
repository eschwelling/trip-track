class Api::V1::StopsController < ApplicationController
  MAX_MBTA_IDS = 500
  MAX_SEARCH_RESULTS = 50

  def index
    stops = Stop.where("mbta_id > 0")

    # Resolving MBTA ids to local records used to mean downloading every stop
    # in the system (~9k rows, >2 MB). Callers now pass the handful of ids they
    # actually care about.
    if params[:mbta_ids].present?
      stops = stops.where(mbta_id: parsed_mbta_ids)
    end

    render json: stops, adapter: :json
  end

  def search
    stops = Stop.where("name ILIKE ?", "%#{params['search_string']}%").limit(MAX_SEARCH_RESULTS)
    render json: stops
  end

  private

  def parsed_mbta_ids
    params[:mbta_ids].to_s.split(",").filter_map { |id| Integer(id, exception: false) }.first(MAX_MBTA_IDS)
  end
end
