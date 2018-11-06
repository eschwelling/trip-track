class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.belongs_to :journey, null: false
      t.string :arrival, null: false
      t.string :departure, null: false

      t.timestamps null: false
    end
  end
end
