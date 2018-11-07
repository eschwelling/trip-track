class Api::V1::UsersController < ApplicationController
  # protect_from_forgery unless: -> { request.format.json? }
  #
  # skip_before_action :verify_authenticity_token
  #
  # before_action :authenticate_user!, only: [:destroy]
  #
  # prepend_before_action(only: [:destroy]) { request.env[“devise.skip_timeout”] = true }

  def index
    @user = current_user
    render json: @user
  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    yield if block_given?
    respond_to_on_destroy
  end
end
