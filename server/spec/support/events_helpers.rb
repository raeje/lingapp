# frozen_string_literal: true

module EventsHelpers
  def event_params
    {
      name: event.name,
      description: event.description,
      category: event.category,
      maximum_participants: event.maximum_participants,
      starts_at: event.starts_at,
      ends_at: event.ends_at,
      city: event.city,
      barangay: event.barangay,
      house: event.house,
      landmark: event.landmark
    }
  end

  def event_basic_info_params
    {
      name: event.name,
      description: event.description,
      category: event.category,
      maximum_participants: event.maximum_participants,
    }
  end

  def event_params_no_dependency
    {
      name: 'event.name',
      description: 'event.description',
      category: 'environmental',
      maximum_participants: 123,
      starts_at: 3.days.from_now,
      ends_at: 3.days.from_now + 3.hours,
      city: 'event.city',
      barangay: 'event.barangay',
      house: 'event.house',
      landmark: 'event.landmark'
    }
  end
end
