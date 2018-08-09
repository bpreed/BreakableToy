class RemoveAddressRequirement < ActiveRecord::Migration[5.2]
  def up
    change_column :events, :address, :string, null: true
  end
  def down
    change_column :events, :address, :string, null: false
  end
end
