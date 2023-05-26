class AddForeignKeysToEventsUsers < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :events_users, :events
    add_foreign_key :events_users, :users
  end
end
