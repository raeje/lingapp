# == Schema Information
#
# Table name: events_users
#
#  id           :bigint           not null, primary key
#  has_attended :boolean          default(FALSE), not null
#  is_approved  :boolean          default(FALSE), not null
#  event_id     :bigint           not null
#  user_id      :bigint           not null
#
# Indexes
#
#  composite_key  (user_id,event_id) UNIQUE
#
class EventsUser < ApplicationRecord
  belongs_to :event
  belongs_to :user

  validate :throw_error_if_event_has_concluded

  def exists?(user_id, event_id)
    where(user_id:, event_id:)
  end

  def throw_error_if_event_has_concluded
    return unless event_concluded?

    errors.add(:event_id, 'Cannot access concluded events.')
  end

  def event_concluded?
    Event.find(event_id).concluded?
  end
end
