# frozen_string_literal: true

# app/views/api/v1/events/guest_list.json.jbuilder
guests = EventsUser.joins(:user)
                   .where(event_id: @event.id)
                   .select('events_users.*, users.first_name, users.last_name')
json.set! :guests do
  json.array! guests do |guest|
    json.id guest.id
    json.user_id guest.user_id
    json.first_name guest.first_name
    json.last_name guest.last_name
    json.is_approved guest.is_approved
    json.has_attended guest.has_attended
  end
end

json.set! :organizer do
  user_id = EventsUser.where(event_id: @event.id)
                      .pluck(:user_id).first
  user = User.find(user_id)
  json.id user_id
  json.first_name user.first_name
  json.last_name user.last_name
end
