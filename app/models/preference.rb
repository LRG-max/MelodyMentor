class Preference < ApplicationRecord
  belongs_to :user
  belongs_to :survey
  has_many :user_answers, dependent: :destroy
  has_many :questions, through: :survey
end
