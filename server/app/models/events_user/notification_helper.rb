# frozen_string_literal: true

# app/models/events_user/notification_helper.rb
class EventsUser
  # Creates UserNotifications as side-effect on EventsUser actions
  module NotificationHelper
    def event_name
      Event.find(event_id).name
    end

    def create_notif_user_applied
      return unless volunteer?

      title = 'Your request to join an event has been submitted.'
      body = "Your application to join the \'#{event_name}\' community event has been received and is currently under review."
      UserNotification.create!(title:,
                               body:,
                               user_id:)
    end

    def create_notif_user_approved
      title = "\u{1F389}\u{1F389}\u{1F389} Congratulations!  Your request to join an event has been approved."
      body = "Your application to join the #{event_name} community event has been approved!"
      UserNotification.create!(title:,
                               body:,
                               user_id:)
    end

    private

    def volunteer?
      user = User.find(user_id)
      user.role == 'volunteer'
    end
  end
end
