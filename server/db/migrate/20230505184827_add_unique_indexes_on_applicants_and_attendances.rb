class AddUniqueIndexesOnApplicantsAndAttendances < ActiveRecord::Migration[7.0]
  def change
    add_index(:attendances, %i[user_id event_id], unique: true, name: 'attendances_by_event_user')
    add_index(:applicants, %i[user_id event_id], unique: true, name: 'applicants_by_event_user')
  end
end
