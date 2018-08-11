class ChangeCaptainField < ActiveRecord::Migration[5.2]
  def up
    remove_column :teams, :captain
    add_column :teams, :captain_id, :integer
  end
  def down
    remove_column :teams, :captain_id
    add_column :teams, :captain, :string
  end
end
