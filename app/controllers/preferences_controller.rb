class PreferencesController < ApplicationController
  def new
    @preference = Preference.new
    @questions = Question.all
  end

  def create
    # Création d'une instance de préférences avec ce que nous envoie les users
    @preference = Preference.new(preference_params)
    # Assignation des infos connues
    @preference.user = current_user
    @preference.survey = Survey.first
    # Sauvegarde en base de données et affichage
    if @preference.save!
      redirect_to preferences_path(@preference)
    else
      render :new, status: :unprocessable_entity
    end

  end

  private

  def preference_params
    params.require(:preference).permit(:mood_preference, :composition_experience)
  end
end
