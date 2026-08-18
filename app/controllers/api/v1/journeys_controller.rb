class Api::V1::JourneysController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    journeys = current_user.journeys.includes(:origin, :destination, :line)
    render json: journeys, adapter: :json, each_serializer: JourneySummarySerializer
  end

  def show
    @journey = Journey.includes(:origin, :destination, :line, :user, :notes).find(params[:id])

    render json: @journey, adapter: :json
  end

  def create
    @journey = Journey.new(
      origin: Stop.find(params.require(:origin)),
      destination: Stop.find(params.require(:destination)),
      line: Line.find(params.require(:line)),
      direction_id: params[:direction],
      # The owner comes from the session rather than the request body, so a
      # client can't save commutes onto someone else's account.
      user: current_user
    )

    if @journey.save
      render json: @journey
    else
      render json: { errors: @journey.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActionController::ParameterMissing, ActiveRecord::RecordNotFound => e
    render json: { errors: ["line, origin, and destination are required: #{e.message}"] },
           status: :unprocessable_entity
  end

  def destroy
    @journey = current_user.journeys.find(params[:id])
    @journey.destroy
    render json: { id: @journey.id }
  end
end
