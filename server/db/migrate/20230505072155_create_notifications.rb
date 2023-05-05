class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.string :title
      t.string :body
      t.boolean :is_read
      t.timestamps
    end
  end
end
