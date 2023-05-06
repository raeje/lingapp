class AddTypeColToEvent < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :type, :string
  end
end
