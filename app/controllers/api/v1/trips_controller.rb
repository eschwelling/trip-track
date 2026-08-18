class Api::V1::TripsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  MAX_TRIPS = 1000

  def index
    trips = Journey.find(params[:journey_id]).trips
                   .select('DISTINCT ON (trips.arrival, trips.departure) trips.arrival, trips.departure, trips.journey_id, trips.id')
                   .limit(MAX_TRIPS)
    render json: trips
  end

  def show
    @trip = Trip.find(params[:id])
    render json: @trip, adapter: :json
  end

  # Accepts either a single trip or a `trips` array. The journey page used to
  # fire one request per predicted trip; it now sends them in a single call,
  # and the unique index drops predictions that were already recorded.
  def create
    @journey = Journey.find(params[:journey_id])

    return create_many if params[:trips].present?

    @trip = @journey.trips.new(trip_params)
    if @trip.save
      render json: @trip
    else
      render json: { errors: @trip.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def create_many
    now = Time.current
    rows = params[:trips].map { |trip| trip.permit(:arrival, :departure) }
                         .reject { |trip| trip[:arrival].blank? || trip[:departure].blank? }
                         .first(MAX_TRIPS)
                         .map do |trip|
      { journey_id: @journey.id, arrival: trip[:arrival], departure: trip[:departure],
        created_at: now, updated_at: now }
    end

    inserted = rows.any? ? Trip.insert_all(rows, unique_by: %i[journey_id arrival departure]).count : 0
    render json: { submitted: rows.size, created: inserted }
  end

  def trip_params
    params.permit(:arrival, :departure)
  end
end
