class RenameCompositionPianosToCompositionsPiano < ActiveRecord::Migration[7.1]
  def change
    rename_table :composition_pianos, :compositions_piano
  end
end
