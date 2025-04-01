class ChallengesController < ApplicationController
  require 'time'

  def index
    @challenge = Challenge.where(active: true).order("RANDOM()").first

    if session[:last_challenge_time].nil? || Time.now - Time.parse(session[:last_challenge_time]) > 300
      session[:last_challenge_time] = Time.now.to_s # Stocke sous forme de String
      session[:current_challenge_id] = Challenge.order("RANDOM()").first.id
    end

    @current_challenge = Challenge.find(session[:current_challenge_id])
  end

  def show
    @challenge = Challenge.find(params[:id])
  end

  def random
    challenge = Challenge.where(active: true).order("RANDOM()").first
    if challenge
      session[:current_challenge_id] = challenge.id
      session[:last_challenge_time] = Time.now.to_s
      redirect_to challenges_path
    else
      redirect_to root_path, alert: "Aucun défi actif pour le moment."
    end
  end
end
