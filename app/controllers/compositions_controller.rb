class CompositionsController < ApplicationController
  def index
    @compositions = Composition.all
  end

  def new
    @composition = Composition.new(key_signature: nil, mood: nil)
  end

  def create
    @composition = Composition.new(composition_params)
    @composition.user = current_user if user_signed_in?
    if @composition.save
      redirect_to composition_path(@composition)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @composition = Composition.find(params[:id])
    @composition.destroy

    respond_to do |format|
      format.html { redirect_to compositions_path, notice: "Composition supprimée." }
      format.turbo_stream { render turbo_stream: turbo_stream.remove(@composition) }
    end
  end

  def show
    @composition = Composition.find(params[:id])
  end

  private

  def composition_params
    params.require(:composition).permit(:title, :key_signature, :style, :mood)
  end
end
