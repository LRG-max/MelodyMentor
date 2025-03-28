class PreferencesController < ApplicationController
  def new
    @preference = Preference.new
    @preference.user_id = current_user.id
    survey = Survey.all.first
    @preference.survey = survey
    @preference.save!
    @questions = survey.questions
  end
end
