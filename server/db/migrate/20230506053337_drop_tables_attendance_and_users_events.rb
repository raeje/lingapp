class DropTablesAttendanceAndUsersEvents < ActiveRecord::Migration[7.0]
  def change
    drop_table :attendances
    drop_table :users_events
  end
end
