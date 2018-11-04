class CreateJourneys < ActiveRecord::Migration[5.2]
  def change
    create_table :journeys do |t|
      t.belongs_to :origin, null: false
      t.belongs_to :destination, null: false
      t.belongs_to :line, null: false
      t.belongs_to :user, null: false
      t.integer :direction_id, null: false

      t.timestamps
    end
  end
end
