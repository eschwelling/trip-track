class CreateLines < ActiveRecord::Migration[5.2]
  def change
    create_table :lines do |t|
      t.string :name, null: false
      t.string :short_name, null: false
      t.string :description, null: false
      t.string :mbta_id, null: false

      t.timestamps null: false
    end
  end
end
