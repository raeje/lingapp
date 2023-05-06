class AddColumnsToEventsUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :events_users, :is_approved, :boolean, null: false, default: false
    add_column :events_users, :has_attended, :boolean, null: false, default: false
  end
end
