class ChangeEventTypeColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :events, :type, :types
  end
end
