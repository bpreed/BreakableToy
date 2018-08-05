class CreateEventTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :event_types do |t|
      t.belongs_to :event
      t.belongs_to :type

      t.timestamps null: false
    end
  end
end
