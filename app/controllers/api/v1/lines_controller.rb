class Api::V1::LinesController < ApplicationController
  # TripTrack's line picker covers bus routes only; these are the MBTA route
  # descriptions it leaves out.
  NON_BUS_DESCRIPTIONS = ["Rapid Transit", "Commuter Rail", "Limited Service", "Ferry"].freeze

  def index
    @lines = Line.all
    # Opt-in so the client can skip downloading routes it will never display.
    @lines = @lines.where.not(description: NON_BUS_DESCRIPTIONS) if params[:bus_only].present?
    render json: @lines, adapter: :json
  end
end
