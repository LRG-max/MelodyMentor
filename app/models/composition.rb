require 'streamio-ffmpeg'

class Composition < ApplicationRecord
  belongs_to :user

  before_save :set_duration

  def formatted_duration
    return "Non spécifiée" unless duration.present?

    minutes = duration / 60
    seconds = duration % 60
    format("%02d:%02d", minutes, seconds)
  end

  private

  def set_duration
    return unless audio_url.present?

    file = FFMPEG::Movie.new(audio_url)
    self.duration = file.duration.to_i
  end
end
