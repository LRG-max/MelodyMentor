class CompositionsController < ApplicationController
  def index
    @compositions = Composition.all
  end

  def new
    @composition = Composition.new(key_signature: nil, style: nil, mood: nil)
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
    @key_signature = @composition.key_signature # Récupérer la tonalité choisie
  end


  def save_audio
    @composition = Composition.find(params[:id])

    if params[:audio]
      @composition.audio.attach(params[:audio])
      @composition.save
      @composition.regenerate_duration!

      begin
        file = URI.open(@composition.audio.service_url)
        movie = FFMPEG::Movie.new(file.path)
        @composition.update(duration: movie.duration.to_i)
      rescue => e
        Rails.logger.error("Erreur FFMPEG : #{e.message}")
      end

      head :ok
    else
      render json: { error: "Aucun fichier reçu." }, status: :unprocessable_entity
    end
  end

  private

  def composition_params
    params.require(:composition).permit(:title, :key_signature, :style, :mood, :audio)
  end
end
