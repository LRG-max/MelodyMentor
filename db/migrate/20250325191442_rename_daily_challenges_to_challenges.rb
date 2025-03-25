class RenameDailyChallengesToChallenges < ActiveRecord::Migration[7.1]
  def change
    rename_table :daily_challenges, :challenges
  end
end
