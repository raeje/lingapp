# frozen_string_literal: true

# app/views/api/v1/events/show.json.jbuilder
guests = EventsUser.joins(:user)
                   .where(event_id: @event.id)
                   .select('events_users.id AS guest_list_id, events_users.*, users.id, users.first_name, users.last_name, users.role')

json.id @event.id
json.barangay @event.barangay
json.category @event.category
json.city @event.city
json.description @event.description
json.ends_at @event.ends_at
json.house @event.house
json.landmark @event.landmark
json.maximum_participants @event.maximum_participants
json.name @event.name
json.notes @event.notes
json.starts_at @event.starts_at
json.image rails_blob_url(@event.image)

json.set! :organizer do
  user = guests.where('users.role = ?', 'organizer').first
  json.id user.id
  json.first_name user.first_name
  json.last_name user.last_name
  json.role user.role
end

json.has_applied EventsUser.exists?(event_id: @event.id, user_id: @current_user.id)
json.is_approved EventsUser.where(event_id: @event.id, user_id: @current_user.id).pluck(:is_approved).first

json.set! :guest_list do
  json.approved_count @event.approved_participants
  json.pending_count @event.pending_participants
end
