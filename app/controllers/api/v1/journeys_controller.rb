class Api::V1::JourneysController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  # before_action :authenticate_user!, except: [:index, :show]

  def index
    journeys = current_user.journeys
    render json: journeys, adapter: :json
  end

  def show
    @journey = Journey.find(params[:id])
    @origin = @journey.origin
    @destination = @journey.destination

    render json: @journey, adapter: :json
  end

  def create
    @origin = Stop.find(params.require(:origin))
    @destination = Stop.find(params.require(:destination))
    @line = Line.find(params.require(:line))

    @journey = Journey.new(journey_params_id)
    @journey.origin = @origin
    @journey.destination = @destination
    @journey.line = @line

    if @journey.save
      render json: @journey
    else
      render json: {errors: @journey.errors.full_messages}
    end

  rescue ActionController::ParameterMissing, ActiveRecord::RecordNotFound => e
    render json: { errors: ["line, origin, and destination are required: #{e.message}"] },
           status: :unprocessable_entity
  end

  def destroy
    @journey = Journey.find(params[:id])
    @journey.destroy
    @journeys = Journey.all
    render json: {journey: @journeys }
  end


  private
  def journey_params
    params.permit(
      :line,
      :origin,
      :destination,
      :direction,
      :user
    )
  end

  def journey_params_id
    parsed_journey_params = {}
      journey_params.each do |k,v|
        new_key = k + "_id"
        parsed_journey_params[new_key] = v
      end
    parsed_journey_params
  end
end
