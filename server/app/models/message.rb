# frozen_string_literal: true

# == Schema Information
#
# Table name: messages
#
#  id             :bigint           not null, primary key
#  body           :text
#  is_read        :boolean          default(FALSE)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  events_user_id :bigint           not null
#
# Indexes
#
#  index_messages_on_events_user_id  (events_user_id)
#
# Foreign Keys
#
#  fk_rails_...  (events_user_id => events_users.id)
#
class Message < ApplicationRecord
  belongs_to :events_user

  validates(:body, presence: true)

  validate :validate_user_is_approved

  def validate_user_is_approved
    return if user_approved?(events_user_id)

    errors.add(:base, message: 'The chat group is exclusive to attendees only.')
  end

  def self.user_approved?(events_user_id)
    EventsUser.find(events_user_id).is_approved
  end

  def user_approved?(events_user_id)
    EventsUser.find(events_user_id).is_approved
  end
end
