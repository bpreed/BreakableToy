class AddBrEventId < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :bike_reg_id, :integer, null: false
  end
end
