class UpdateKeySignatureAndAddMoodToCompositions < ActiveRecord::Migration[7.1]
  def change
    change_column :compositions, :key_signature, :string, array: true, default: [], using: "string_to_array(key_signature, ',')"
    add_column :compositions, :mood, :string, array: true, default: []
  end
end
