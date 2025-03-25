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
end
