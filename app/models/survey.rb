class Survey < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :preferences, dependent: :destroy
  has_many :user_answers, through: :questions
end
