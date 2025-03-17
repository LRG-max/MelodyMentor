class RenameHeySignatureToKeySignatureInCompositions < ActiveRecord::Migration[7.1]
  def change
    rename_column :compositions, :hey_signature, :key_signature
  end
end
