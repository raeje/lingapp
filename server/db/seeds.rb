# frozen_string_literal: true

def login_user(email, password)
  response = RestClient.put('http://localhost:3000/api/v1/login', { email:, password: })
  p '-------------------------------------------'
  p "Logging in user: #{email}"
  p JSON.parse(response)['token']
  p '-------------------------------------------'
  JSON.parse(response)['token']
end

def create_event(event_params, headers)
  response = RestClient.post('http://localhost:3000/api/v1/events', event_params, headers)
  p '-------------------------------------------'
  p 'Event created:'
  p JSON.parse(response)
  p '-------------------------------------------'
end

# -----------------------------------------------
# User
# -----------------------------------------------
User.create!(
  first_name: 'Jerry',
  last_name: 'Seinfeld',
  email: 'jerry@lingapp.com',
  password: 'jerry',
  password_confirmation: 'jerry',
  alias: 'Jerry',
  role: 'organizer',
  contact_number: '123321',
  city: 'City Of Makati',
  barangay: 'New York',
  house: '#123 Hell\'s Kitchen Street'
)

User.create!(
  first_name: 'Cosmo',
  last_name: 'Kramer',
  email: 'cosmo@lingapp.com',
  password: 'kramer',
  password_confirmation: 'kramer',
  alias: 'Kramer',
  role: 'volunteer',
  contact_number: '322321',
  city: 'City Of Makati',
  barangay: 'New York',
  house: '#124 Hell\'s Kitchen Street'
)

User.create!(
  first_name: 'Elaine',
  last_name: 'Benes',
  email: 'elaine@lingapp.com',
  password: 'elaine',
  password_confirmation: 'elaine',
  alias: 'Elaine',
  role: 'organizer',
  contact_number: '3213213',
  city: 'Pasig City',
  barangay: 'San Sebastian',
  house: '#369 Apartment Building'
)

User.create!(
  first_name: 'George',
  last_name: 'Costanza',
  email: 'george@lingapp.com',
  password: 'george',
  password_confirmation: 'elaine',
  alias: 'George',
  role: 'volunteer',
  contact_number: '3213218',
  city: 'Cebu City',
  barangay: 'San Isidro',
  house: '#420 High Place Street, Lower Area Subdivision'
)

# -----------------------------------------------
# Event
# -----------------------------------------------
token = login_user('jerry@lingapp.com', 'jerry')
headers = {
  'Content-Type': 'application/json',
  'Authorization': token
}
create_event({ 'name': 'Tree Planting',
               'description': 'Tree Planting at Mt. Batulao',
               'category': 'environmental',
               'starts_at': DateTime.now + 2.minutes,
               'ends_at': DateTime.now + 90.minutes,
               'maximum_participants': 30,
               'city': 'Quezon City',
               'barangay': 'Santo Domingo',
               'house': '#8 Kanto Tinio' }, headers)

create_event({ 'name': 'Operation Tuli',
               'description': '51st Annual Operation Tuli',
               'category': 'health',
               'starts_at': DateTime.now + 4.days,
               'ends_at': DateTime.now + 5.days + 90.minutes,
               'maximum_participants': 33,
               'city': 'Quezon City',
               'barangay': 'Santa Maria',
               'house': '#8 Gen. Trias Street' }, headers)

token = login_user('elaine@lingapp.com', 'elaine')
headers = {
  'Content-Type': 'application/json',
  'Authorization': token
}
create_event({ 'name': 'Disaster Response',
               'description': 'Relief Goods Distribution',
               'category': 'disaster',
               'starts_at': DateTime.now + 2.days + 30.minutes,
               'ends_at': DateTime.now + 2.days + 60.minutes,
               'maximum_participants': 30,
               'city': 'Batanes',
               'barangay': 'Santo Domingo',
               'house': '#8 Batan' }, headers)

create_event({ 'name': 'Disaster Response',
               'description': 'Relief Goods Distribution',
               'category': 'disaster',
               'starts_at': DateTime.now + 3.days + 30.minutes,
               'ends_at': DateTime.now + 3.days + 60.minutes,
               'maximum_participants': 30,
               'city': 'Batanes',
               'barangay': 'Santo Domingo',
               'house': '#8 Batan' }, headers)
