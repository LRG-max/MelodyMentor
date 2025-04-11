class AddChallengeDescriptionToCompositions < ActiveRecord::Migration[7.1]
  def change
    add_column :compositions, :challenge_description, :text
  end
end
