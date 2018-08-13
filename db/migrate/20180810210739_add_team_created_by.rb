class AddTeamCreatedBy < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :created_by, :string, null: false
    add_column :teams, :captain, :string
  end
end
