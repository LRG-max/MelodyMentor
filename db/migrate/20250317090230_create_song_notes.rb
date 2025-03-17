class CreateSongNotes < ActiveRecord::Migration[7.1]
  def change
    create_table :song_notes do |t|
      t.references :note, null: false, foreign_key: true
      t.references :composition_piano, null: false, foreign_key: true

      t.timestamps
    end
  end
end
