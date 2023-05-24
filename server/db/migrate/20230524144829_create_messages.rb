class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :events_user,
                   null: false,
                   foreign_key: { to_table: :events_users }
      t.text :body
      t.boolean :is_read, default: false
      t.timestamps
    end
  end
end
