# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_01_223313) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "journeys", force: :cascade do |t|
    t.bigint "origin_id", null: false
    t.bigint "destination_id", null: false
    t.bigint "line_id", null: false
    t.bigint "user_id", null: false
    t.integer "direction_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["destination_id"], name: "index_journeys_on_destination_id"
    t.index ["line_id"], name: "index_journeys_on_line_id"
    t.index ["origin_id"], name: "index_journeys_on_origin_id"
    t.index ["user_id"], name: "index_journeys_on_user_id"
  end

  create_table "lines", force: :cascade do |t|
    t.string "name", null: false
    t.string "short_name", null: false
    t.string "description", null: false
    t.string "mbta_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text "content"
    t.string "searchable_type"
    t.bigint "searchable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id"
  end

  create_table "stops", force: :cascade do |t|
    t.integer "mbta_id", null: false
    t.string "name", null: false
    t.string "description"
    t.string "address"
    t.string "latitude"
    t.string "longitude"
    t.string "platform_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_stops_on_name"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "user_name", default: "", null: false
    t.string "profile_photo"
    t.string "role", default: "f", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["user_name"], name: "index_users_on_user_name", unique: true
  end

end
