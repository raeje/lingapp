class AddBadgeTitleToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :badge_title, :string
  end
end
