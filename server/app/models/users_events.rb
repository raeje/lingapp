# frozen_string_literal: true

# == Schema Information
#
# Table name: users_events
#
#  id           :bigint           not null, primary key
#  has_attended :boolean          default(FALSE), not null
#  is_approved  :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  event_id     :bigint           not null
#  user_id      :bigint           not null
#
# Indexes
#
#  applicants_by_event_user        (user_id,event_id) UNIQUE
#  index_users_events_on_event_id  (event_id)
#  index_users_events_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#  fk_rails_...  (user_id => users.id)
#
class UsersEvents < ApplicationRecord
  belongs_to :user
  belongs_to :event

  def exists?(user_id, event_id)
    where(user_id:, event_id:)
  end
end
