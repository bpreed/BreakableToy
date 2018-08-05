class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.datetime :date, null: false
      t.string :url, null: false
      t.decimal :latitude, null: false
      t.decimal :longitude, null: false
      t.date :reg_open, null: false
      t.date :reg_close, null: false

      t.timestamps
    end
  end
end
