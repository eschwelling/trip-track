class CreateStops < ActiveRecord::Migration[5.2]
  def change
    create_table :stops do |t|
      t.integer :mbta_id, null: false
      t.string :name, null: false
      t.string :description
      t.string :address
      t.string :latitude
      t.string :longitude
    end
  end
end
