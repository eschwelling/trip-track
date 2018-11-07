class Api::V1::TripsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    trips = Journey.find(params[:journey_id]).trips.select('DISTINCT ON (trips.arrival, trips.departure) trips.arrival, trips.departure, trips.journey_id, trips.id').limit(1000)
    # trips = Trip.select('DISTINCT ON (trips.arrival, trips.departure) trips.arrival, trips.departure, trips.journey_id, trips.id').limit(1000)
    render json: trips
  end

  def show
    @trip = Trip.find(params[:id])
    render json: @trip, adapter: :json
  end

  def create

    @journey = Journey.find(params[:journey_id])

    @trip = Trip.new(trip_params)
    @trip.journey = @journey
    if @trip.save
      render json: @trip
    else
      render json: {errors: @trip.errors.full_messages}
    end

  end

  private

  def trip_params
    params.permit(
      :arrival,
      :departure
    )
  end

end
