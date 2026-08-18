class Api::V1::MbtaController < ApplicationController
  MBTA_BASE_URL = "https://api-v3.mbta.com"

  # Proxies MBTA V3 API requests so the API key stays server-side instead of
  # being exposed to every client (it used to be injected into the page as
  # window.MBTAkey, and several endpoints were being called with no key at all).

  # Stops and schedules are timetable data that changes on rating boundaries,
  # not minute to minute, so they can sit in the browser cache. Predictions are
  # realtime and deliberately left uncached.
  CACHEABLE_FOR = 10.minutes

  # Returns the route's stops already resolved to local Stop records, so every
  # option the picker offers can actually be saved to a journey. Previously the
  # client matched MBTA ids against the stops table itself and silently ended up
  # with unsaveable options whenever a stop had never been seeded.
  def stops
    response = mbta_get("/stops", filter: params.permit(:direction_id, :route).to_h)
    return render_upstream_failure(response) unless response.code.to_i == 200

    mbta_stops = parse_data(response)
    expires_in CACHEABLE_FOR, public: false
    render json: { stops: resolve_local_stops(mbta_stops) }
  rescue *NETWORK_ERRORS => e
    render_unavailable(e)
  end

  def predictions
    proxy_mbta_request("/predictions", filter: params.permit(:stop).to_h)
  end

  def schedules
    expires_in CACHEABLE_FOR, public: false
    proxy_mbta_request("/schedules", filter: params.permit(:route, :stop).to_h)
  end

  private

  NETWORK_ERRORS = [Timeout::Error, HTTParty::Error, SocketError, SystemCallError].freeze

  def proxy_mbta_request(path, filter:)
    response = mbta_get(path, filter: filter)
    render json: response.body, status: response.code
  rescue *NETWORK_ERRORS => e
    render_unavailable(e)
  end

  def mbta_get(path, filter:)
    query = filter.transform_keys { |key| "filter[#{key}]" }
    # Without a key MBTA still answers, just at a lower shared rate limit
    query["api_key"] = ENV["MBTA_KEY"] if ENV["MBTA_KEY"].present?

    HTTParty.get("#{MBTA_BASE_URL}#{path}", query: query, timeout: 10)
  end

  def parse_data(response)
    body = JSON.parse(response.body)
    body.is_a?(Hash) ? Array(body["data"]) : []
  rescue JSON::ParserError
    []
  end

  # Mirrors the route's stops into the local stops table and hands back the
  # local records. Stops whose MBTA id isn't numeric (the subway's "place-..."
  # ids) can't be held in the integer mbta_id column, so they're dropped here
  # rather than offered in the picker and then rejected on save.
  def resolve_local_stops(mbta_stops)
    wanted = mbta_stops.filter_map do |stop|
      mbta_id = Integer(stop["id"], exception: false)
      next if mbta_id.nil? || mbta_id <= 0

      { mbta_id: mbta_id, attributes: stop["attributes"] || {} }
    end
    return [] if wanted.empty?

    existing = Stop.where(mbta_id: wanted.map { |stop| stop[:mbta_id] }).index_by(&:mbta_id)

    # MBTA returns stops in route order; preserve it so the first and last stop
    # remain sensible defaults for origin and destination.
    wanted.filter_map do |stop|
      record = existing[stop[:mbta_id]] || create_stop(stop)
      next if record.nil?

      { id: record.id, mbta_id: record.mbta_id, name: record.name }
    end
  end

  def create_stop(stop)
    attributes = stop[:attributes]
    Stop.create!(
      mbta_id: stop[:mbta_id],
      name: attributes["name"],
      description: attributes["description"],
      address: attributes["address"],
      latitude: attributes["latitude"],
      longitude: attributes["longitude"],
      platform_name: attributes["platform_name"]
    )
  rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotUnique
    Stop.find_by(mbta_id: stop[:mbta_id])
  end

  def render_upstream_failure(response)
    render json: { errors: [{ status: response.code.to_s, title: "MBTA API error" }] },
           status: :bad_gateway
  end

  def render_unavailable(error)
    render json: { errors: [{ status: "502", title: "MBTA API unavailable", detail: error.message }] },
           status: :bad_gateway
  end
end
