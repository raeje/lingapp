class CreateApplicants < ActiveRecord::Migration[7.0]
  def change
    create_table :applicants do |t|
      t.references :user, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true
      t.boolean :is_approved, null: false, default: false
      t.boolean :has_attended, null: false, default: false
      t.timestamps
    end
  end
end
