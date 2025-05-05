class AddPlayOrderToCompositions < ActiveRecord::Migration[7.1]
  def change
    add_column :compositions, :play_order, :text
  end
end
