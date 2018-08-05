class EditEventDates < ActiveRecord::Migration[5.2]
  def up
    remove_column :events, :reg_open
    remove_column :events, :reg_close
    add_column :events, :reg_open, :datetime, null: false
    add_column :events, :reg_close, :datetime, null: false
  end
  def down
    remove_column :events, :reg_open
    remove_column :events, :reg_close
    add_column :events, :reg_open, :date, null: false
    add_column :events, :reg_close, :date, null: false
  end
end
