class AddDurationToCompositions < ActiveRecord::Migration[7.1]
  def change
    add_column :compositions, :duration, :integer
  end
end
