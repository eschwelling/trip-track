class Api::V1::NotesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    @notes = Note.all
    render json: @notes, adapter: :json
  end


  def create

    @user = params[:user]
    @journey = Journey.find(params[:journey].to_i)
    @note = Note.new(body: params[:body], journey: @journey, user_id: @user, photo_path: params[:photo_path])
    @note.journey = @journey

    if @note.save
      render json: {note: @note}, adapter: :json
      binding.pry
    else
      render json: {errors: @note.errors.full_messages}
    end
  end
end
