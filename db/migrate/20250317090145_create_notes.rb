class CreateNotes < ActiveRecord::Migration[7.1]
  def change
    create_table :notes do |t|
      t.string :key
      t.string :tempo

      t.timestamps
    end
  end
end
