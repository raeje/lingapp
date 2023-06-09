# frozen_string_literal: true

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
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#  fk_rails_...  (user_id => users.id)
#
class EventsUser < ApplicationRecord
  include ActiveModel::Dirty
  include NotificationHelper

  belongs_to :event
  belongs_to :user

  has_many :messages, dependent: :delete_all

  validate :validate_event_concluded

  after_create :create_notif_user_applied
  before_update :create_notif_user_approved
  before_destroy :create_notif_user_cancelled

  def exists?(user_id, event_id)
    where(user_id:, event_id:)
  end

  def user_approved?
    is_approved_previously_changed?(from: [nil, false], to: true)
  end

  def validate_event_concluded
    return unless Event.find(event_id).concluded?

    errors.add(:event_id, message: 'Cannot access concluded events.')
  end
end
