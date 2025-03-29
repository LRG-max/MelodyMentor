class AddMoodToCompositions < ActiveRecord::Migration[7.1]
  def change
    add_column :compositions, :mood, :string
  end
end
