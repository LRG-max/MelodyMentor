class UserAnswer < ApplicationRecord
  belongs_to :user
  belongs_to :preference
  belongs_to :question
end
