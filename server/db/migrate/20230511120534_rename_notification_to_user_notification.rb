class RenameNotificationToUserNotification < ActiveRecord::Migration[7.0]
  def change
    rename_table :notifications, :user_notifications
  end
end
