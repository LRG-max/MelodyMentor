class ChallengesController < ApplicationController
  require 'time'

  def index
    @current_challenge = Challenge.where(active: true).order("RANDOM()").first
  end

  def show
    @challenge = Challenge.find(params[:id])
    @composition = current_user.compositions.create(
  title: @challenge.title,
  key_signature: "DO",
  challenge_description: @challenge.description
)
    session[:challenge_description] = @challenge.description

    redirect_to composition_path(@composition)
  end

  def random
    challenge = Challenge.where(active: true).order("RANDOM()").first
    if challenge
      session[:current_challenge_id] = challenge.id
      session[:last_challenge_time] = Time.now.to_s
      redirect_to challenges_path(reload: true)
    else
      redirect_to root_path, alert: "Aucun défi actif pour le moment."
    end
  end
end
