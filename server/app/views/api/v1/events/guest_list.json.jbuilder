# frozen_string_literal: true

# app/views/api/v1/events/guest_list.json.jbuilder
guests = EventsUser.joins(:user)
                   .where(event_id: @event.id)
                   .select('events_users.id AS guest_list_id, events_users.*, users.id, users.first_name, users.last_name, users.role')
json.set! :guests do
  json.array! guests do |guest|
    json.guest_list_id guest.guest_list_id
    json.user_id guest.user_id
    json.first_name guest.first_name
    json.last_name guest.last_name
    json.is_approved guest.is_approved
    json.has_attended guest.has_attended
  end
end

json.set! :organizer do
  user = guests.where('users.role = ?', 'organizer').first
  json.id user.id
  json.first_name user.first_name
  json.last_name user.last_name
  json.role user.role
end
