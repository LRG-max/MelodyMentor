class CompositionsController < ApplicationController
  def index
    @compositions = Composition.all
  end

  def new
    @composition = Composition.new
  end

  def create
    @composition = Composition.new(composition_params)
    @composition.user = current_user if user_signed_in?
    if @composition.save
      redirect_to compositions_path(@composition)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @composition = Composition.find(params[:id])
  end

  private

  def composition_params
    params.require(:composition).permit(:title, :key_signature, :style)
  end
end
