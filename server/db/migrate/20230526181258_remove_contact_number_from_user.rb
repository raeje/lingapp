class RemoveContactNumberFromUser < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :contact_number
  end
end
