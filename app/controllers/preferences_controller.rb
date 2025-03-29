class PreferencesController < ApplicationController
  def new
    @preference = Preference.new
    @questions = Question.all
  end

  def create
    @preference = Preference.new(preference_params)
    @preference.user_id = current_user.id
    survey = Survey.all.first
    @preference.survey = survey
    @preference.save!
    @questions = survey.questions
  end

  private

  def preference_params
    params.require(:preference).permit(:mood_preference, :composition_experience)
  end
end
