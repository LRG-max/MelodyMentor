class CreateCompositions < ActiveRecord::Migration[7.1]
  def change
    create_table :compositions do |t|
      t.string :title
      t.string :hey_signature
      t.references :user, null: false, foreign_key: true
      t.string :style
      t.string :audio

      t.timestamps
    end
  end
end
