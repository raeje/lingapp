class RenameUserApplicationsToUsersEvents < ActiveRecord::Migration[7.0]
  def change
    rename_table :user_applications, :users_events
  end
end
