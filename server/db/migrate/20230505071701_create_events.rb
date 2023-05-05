class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :name
      t.string :description
      t.datetime :starts_at
      t.datetime :ends_at
      t.integer :maximum_participants
      t.string :notes
      t.timestamps
    end
  end
end
