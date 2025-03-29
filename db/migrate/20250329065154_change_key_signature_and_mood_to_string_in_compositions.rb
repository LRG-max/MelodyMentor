class ChangeKeySignatureAndMoodToStringInCompositions < ActiveRecord::Migration[7.1]
  def change
    change_column :compositions, :key_signature, :string
    change_column :compositions, :mood, :string
  end
end
