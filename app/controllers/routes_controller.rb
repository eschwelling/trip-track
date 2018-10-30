class RoutesController < ApplicationController
  before_action :authorize_user, except: [:index, :show]


  def index
    @title = "Your Route"
    # @route = Route.for "9"
    @data
  end

  def show

  end


  protected

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      # raise ActionController::RoutingError.new("Not Found")
      flash[:notice] = "You do not have access to this page."
      redirect_to root_path
    end
  end


end
