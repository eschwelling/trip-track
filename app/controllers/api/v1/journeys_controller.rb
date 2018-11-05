class Api::V1::JourneysController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  # before_action :authenticate_user!, except: [:index, :show]

  def index
    # @user_journeys = []
    @journeys = Journey.all

    #   @journeys.each do |journey|
    #     if journey.user == current_user
    #       @user_journeys << journey
    #     end
    #   end
    # render json: @user_journeys, adapter: :json
    render json: @journeys, adapter: :json
  end

  def show
    @journey = Journey.find(params[:id])
    @origin = @journey.origin
    @destination = @journey.destination

    render json: @journey, adapter: :json
  end

  def create
    @origin = Stop.find(params[:origin])
    @destination = Stop.find(params[:destination])
    @line = Line.find(params[:line])

    @journey = Journey.new(journey_params_id)
    @journey.origin = @origin
    @journey.destination = @destination
    @journey.line = @line

    if @journey.save
      render json: @journey
    else
      render json: {errors: @journey.errors.full_messages}
    end

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



# 3)
     #origin =  @journey.origin
     #destination =  @journey.destination

     # using the origin and the destination determine the direction

     # Ping the api, for all of the current predictions for this stop
     # parse into ruby hashes
     # with those results, sort out the ones going in the right direction

     # return those as a part of your json response

# On the new journey form
    # designate route/line
    # '' direction
      # at this point, behind the scenes
