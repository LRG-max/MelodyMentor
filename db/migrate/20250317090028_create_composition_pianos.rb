class CreateCompositionPianos < ActiveRecord::Migration[7.1]
  def change
    create_table :composition_pianos do |t|
      t.references :user, null: false, foreign_key: true
      t.string :audio

      t.timestamps
    end
  end
end
