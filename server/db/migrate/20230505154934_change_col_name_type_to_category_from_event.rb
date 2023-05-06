class ChangeColNameTypeToCategoryFromEvent < ActiveRecord::Migration[7.0]
  def change
    rename_column :events, :type, :category
  end
end
