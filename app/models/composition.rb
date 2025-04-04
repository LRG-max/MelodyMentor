require 'streamio-ffmpeg'
require 'open-uri'

class Composition < ApplicationRecord
  belongs_to :user
  has_one_attached :audio



  def formatted_duration
    return "Non spécifiée" unless duration.present?

    minutes = duration / 60
    seconds = duration % 60
    format("%02d:%02d", minutes, seconds)
  end

  def regenerate_duration!
    return unless audio.attached?

    url = Rails.application.routes.url_helpers.rails_blob_url(audio.blob, only_path: false)
    file = URI.open(url)
    movie = FFMPEG::Movie.new(file.path)
    update(duration: movie.duration.to_i)
  rescue => e
    Rails.logger.error("Erreur lors de la lecture de la durée : #{e.message}")
  end

  private

  def set_duration
    return unless audio.attached?

    begin
      downloaded_file = URI.open(audio.service_url)
      movie = FFMPEG::Movie.new(downloaded_file.path)
      self.duration = movie.duration.to_i
    rescue => e
      Rails.logger.error("Erreur lors de la lecture audio : #{e.message}")
    end
  end

end
