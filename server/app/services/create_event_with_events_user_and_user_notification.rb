# frozen_string_literal: true

# app/services/event/create_event_with_events_user_and_user_notification.rb
class CreateEventWithEventsUserAndUserNotification
  def self.call(event, user_id)
    events_user = ''
    user_notification = ''
    ActiveRecord::Base.transaction do
      events_user = EventsUser.create!(event_id: event.id, user_id:, has_attended: true, is_approved: true)
      user_notification = UserNotification.create!(title: 'Community event created.',
                                                   body: "#{event.name} community event successfully created!",
                                                   user_id:)

      unless events_user.persisted? && user_notification.persisted?
        raise ActiveRecord::Rollback
      end
    end

    [events_user, user_notification]
  end
end
