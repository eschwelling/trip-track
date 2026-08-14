class Api::V1::MbtaController < ApplicationController
  MBTA_BASE_URL = "https://api-v3.mbta.com"

  # Proxies MBTA V3 API requests so the API key stays server-side instead of
  # being exposed to every client (it used to be injected into the page as
  # window.MBTAkey, and several endpoints were being called with no key at all).

  def stops
    proxy_mbta_request("/stops", filter: params.permit(:direction_id, :route).to_h)
  end

  def predictions
    proxy_mbta_request("/predictions", filter: params.permit(:stop).to_h)
  end

  def schedules
    proxy_mbta_request("/schedules", filter: params.permit(:route, :stop).to_h)
  end

  private

  def proxy_mbta_request(path, filter:)
    query = filter.transform_keys { |key| "filter[#{key}]" }
    query["api_key"] = ENV["MBTA_KEY"]

    response = HTTParty.get("#{MBTA_BASE_URL}#{path}", query: query)
    render json: response.body, status: response.code
  end
end
