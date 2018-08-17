class CreateTeamEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :team_events do |t|
      t.belongs_to :event, null: false
      t.belongs_to :team, null: false

      t.timestamps null: false
    end
  end
end
