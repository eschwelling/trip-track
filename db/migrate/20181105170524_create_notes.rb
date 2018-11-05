class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.belongs_to :journey, null: false
      t.belongs_to :user, null: false
      t.string :body, null: false
      t.string :photo_path

      t.timestamps null: false
    end
  end
end
