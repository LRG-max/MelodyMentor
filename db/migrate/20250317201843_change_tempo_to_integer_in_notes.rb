class ChangeTempoToIntegerInNotes < ActiveRecord::Migration[7.1]
  def change
    change_column :notes, :tempo, 'integer USING tempo::integer'
  end
end
