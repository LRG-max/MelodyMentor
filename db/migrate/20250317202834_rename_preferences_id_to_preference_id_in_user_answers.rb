class RenamePreferencesIdToPreferenceIdInUserAnswers < ActiveRecord::Migration[7.1]
  def change
    rename_column :user_answers, :preferences_id, :preference_id
  end
end
