# frozen_string_literal: true

# app/views/api/v1/users/achievements.json.jbuilder
events = Event.where('starts_at < ?', DateTime.now)
@events_users = EventsUser.joins(:event)
                          .where(user_id: @user.id, events: { id: events.pluck(:id) })
                          .select('events_users.id AS guest_list_id, events.*,  events_users.*')

def count_by_category(category)
  (@events_users.select { |event| event.category == category }).count
end

json.user_id     @user.id
json.first_name  @user.first_name
json.last_name   @user.last_name
json.badge_title @user.badge_title
json.set! :categories do
  json.animal        count_by_category('animal')
  json.cultural      count_by_category('cultural')
  json.disaster      count_by_category('disaster')
  json.educational   count_by_category('educational')
  json.environmental count_by_category('environmental')
  json.health        count_by_category('health')
  json.social        count_by_category('social')
end
