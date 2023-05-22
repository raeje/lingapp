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
  include ActiveModel::Dirty
  include NotificationHelper

  belongs_to :event
  belongs_to :user

  validate :validate_event_concluded

  after_create :create_notif_user_applied
  before_update :create_notif_user_approved, if: :user_approved?

  def exists?(user_id, event_id)
    where(user_id:, event_id:)
  end

  def user_approved?
    is_approved_previously_changed?(from: false, to: true)
  end

  def validate_event_concluded
    return unless Event.find(event_id).concluded?

    errors.add(:event_id, message: 'Cannot access concluded events.')
  end
end
