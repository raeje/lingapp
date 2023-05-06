class AddPrimaryKeyToEventsUser < ActiveRecord::Migration[7.0]
  def change
    add_column :events_users, :id, :primary_key
  end
end
