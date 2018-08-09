class ChangeLatLongTypes < ActiveRecord::Migration[5.2]
  def up
    remove_column :events, :latitude
    remove_column :events, :longitude
    add_column :events, :latitude, :string, null: false
    add_column :events, :longitude, :string, null: false
  end
  def down
    remove_column :events, :latitude
    remove_column :events, :longitude
    add_column :events, :latitude, :decimal, null: false
    add_column :events, :longitude, :decimal, null: false
  end
end
