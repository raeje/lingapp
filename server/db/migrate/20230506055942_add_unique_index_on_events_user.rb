class AddUniqueIndexOnEventsUser < ActiveRecord::Migration[7.0]
  def change
    add_index(:events_users, %i[user_id event_id], unique: true, name: 'composite_key')
  end
end
