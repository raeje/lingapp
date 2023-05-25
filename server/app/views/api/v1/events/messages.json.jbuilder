# frozen_string_literal: true

# app/views/api/v1/events/messages.json.jbuilder
json.array!(@event.messages.sort_by(&:created_at)) do |message|
  json.event_id @event.id
  json.message_id message.id
  json.body message.body
  json.created_at message.created_at
  json.user_id message.events_user.user.id
  json.user_full_name "#{message.events_user.user.first_name} #{message.events_user.user.last_name}"
end
