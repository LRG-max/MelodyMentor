class CreateDailyChallenges < ActiveRecord::Migration[7.1]
  def change
    create_table :daily_challenges do |t|
      t.string :title
      t.text :description
      t.string :difficulty
      t.boolean :active

      t.timestamps
    end
  end
end
