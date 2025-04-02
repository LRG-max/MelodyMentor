class Question < ApplicationRecord
  belongs_to :survey
  has_many :user_answers, dependent: :destroy
end
