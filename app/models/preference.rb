class Preference < ApplicationRecord
  belongs_to :user
  belongs_to :survey
  has_many :user_answers, dependent: :destroy
  has_many :questions, through: :survey
  # ajouter des validations => 2 valeurs possibles pour mood
  # ajouter des validations => 2 valeurs possibles pour experience
end
