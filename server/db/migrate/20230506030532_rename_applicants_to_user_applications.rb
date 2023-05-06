class RenameApplicantsToUserApplications < ActiveRecord::Migration[7.0]
  def change
    rename_table :applicants, :user_applications
  end
end
