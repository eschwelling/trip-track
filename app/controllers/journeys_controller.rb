class JourneysController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  
  def show
    @journey = Journey.find(params[:id])
  end

  def index
    @journeys = Journey.all
  end

end
