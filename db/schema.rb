# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

<<<<<<< Updated upstream
ActiveRecord::Schema[7.1].define(version: 2025_03_17_202834) do
=======
ActiveRecord::Schema[7.1].define(version: 2025_03_24_140800) do
>>>>>>> Stashed changes
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "compositions", force: :cascade do |t|
    t.string "title"
    t.string "key_signature"
    t.bigint "user_id", null: false
    t.string "style"
    t.string "audio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_compositions_on_user_id"
  end

  create_table "compositions_piano", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "audio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_compositions_piano_on_user_id"
  end

  create_table "daily_challenges", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "difficulty"
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string "key"
    t.integer "tempo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "preferences", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "survey_id", null: false
    t.string "mood_preference"
    t.string "composition_experience"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["survey_id"], name: "index_preferences_on_survey_id"
    t.index ["user_id"], name: "index_preferences_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.bigint "survey_id", null: false
    t.string "question"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["survey_id"], name: "index_questions_on_survey_id"
  end

  create_table "song_notes", force: :cascade do |t|
    t.bigint "note_id", null: false
    t.bigint "composition_piano_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["composition_piano_id"], name: "index_song_notes_on_composition_piano_id"
    t.index ["note_id"], name: "index_song_notes_on_note_id"
  end

  create_table "surveys", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_answers", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "preference_id", null: false
    t.bigint "question_id", null: false
    t.string "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["preference_id"], name: "index_user_answers_on_preference_id"
    t.index ["question_id"], name: "index_user_answers_on_question_id"
    t.index ["user_id"], name: "index_user_answers_on_user_id"
  end

  create_table "user_challenges", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "challenge_id", null: false
    t.boolean "completed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["challenge_id"], name: "index_user_challenges_on_challenge_id"
    t.index ["user_id"], name: "index_user_challenges_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "compositions", "users"
  add_foreign_key "compositions_piano", "users"
  add_foreign_key "preferences", "surveys"
  add_foreign_key "preferences", "users"
  add_foreign_key "questions", "surveys"
  add_foreign_key "song_notes", "compositions_piano", column: "composition_piano_id"
  add_foreign_key "song_notes", "notes"
  add_foreign_key "user_answers", "preferences"
  add_foreign_key "user_answers", "questions"
  add_foreign_key "user_answers", "users"
  add_foreign_key "user_challenges", "challenges"
  add_foreign_key "user_challenges", "users"
end
