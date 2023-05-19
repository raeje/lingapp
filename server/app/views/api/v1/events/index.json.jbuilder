# frozen_string_literal: true

# app/views/api/v1/events/index.json.jbuilder
json.array! @events do |event|
  json.id event.id
  json.barangay event.barangay
  json.category event.category
  json.city event.city
  json.description event.description
  json.ends_at event.ends_at
  json.house event.house
  json.landmark event.landmark
  json.maximum_participants event.maximum_participants
  json.name event.name
  json.notes event.notes
  json.starts_at event.starts_at
  json.image rails_blob_url(event.image)

  json.set! :organizer do
    user_id = EventsUser.where(event_id: event.id)
                        .pluck(:user_id).first
    user = User.find(user_id)
    json.id user_id
    json.first_name user.first_name
    json.last_name user.last_name
  end

  json.participants event.number_of_participants
end
