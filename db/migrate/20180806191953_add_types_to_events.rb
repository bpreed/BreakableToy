class AddTypesToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :type, :text, array:true, default: []
  end
end
