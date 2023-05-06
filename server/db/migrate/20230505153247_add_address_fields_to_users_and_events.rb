class AddAddressFieldsToUsersAndEvents < ActiveRecord::Migration[7.0]
  def change
    change_table(:users) do |t|
      t.column :city, :string
      t.column :barangay, :string
      t.column :house, :string
      t.column :landmark, :string
    end

    change_table(:events) do |t|
      t.column :city, :string
      t.column :barangay, :string
      t.column :house, :string
      t.column :landmark, :string
    end
  end
end
