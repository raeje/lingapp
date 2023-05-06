class CreateJoinTableEventsUsers < ActiveRecord::Migration[7.0]
  def change
    create_join_table :events, :users
  end
end
