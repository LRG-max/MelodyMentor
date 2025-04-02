class AddAudioUrlToCompositions < ActiveRecord::Migration[7.1]
  def change
    add_column :compositions, :audio_url, :string
  end
end
