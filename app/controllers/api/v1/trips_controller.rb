class Api::V1::TripsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    # @trips = Trip.all
    trips = Trip.select('DISTINCT ON (trips.arrival, trips.departure) trips.arrival, trips.departure, trips.journey_id, trips.id')
    render json: trips
    # trips = Trip.select(:arrival, :departure).distinct
    # render json: ActiveModel::Serializer::ArraySerializer.new(trips, each_serializer: TripSerializer), adapter: :json
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
