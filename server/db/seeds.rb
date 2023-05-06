# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create!(
  first_name: 'Jerry',
  last_name: 'Seinfeld',
  email: 'jerry@lingap.com',
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
  email: 'cosmo@lingap.com',
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
  email: 'elaine@lingap.com',
  password: 'elaine',
  password_confirmation: 'elaine',
  alias: 'Elaine',
  role: 'volunteer',
  contact_number: '3213213',
  city: 'Pasig City',
  barangay: 'San Sebastian',
  house: '#369 Apartment Building'
)

User.create!(
  first_name: 'George',
  last_name: 'Costanza',
  email: 'george@lingap.com',
  password: 'elaine',
  password_confirmation: 'elaine',
  alias: 'George',
  role: 'volunteer',
  contact_number: '3213218',
  city: 'Cebu City',
  barangay: 'San Isidro',
  house: '#420 High Place Street, Lower Area Subdivision'
)

Event.create!(
  name: 'Tree Planting',
  description: 'Tree Planting at Mt. Batulao',
  category: 'environmental',
  starts_at: DateTime.now,
  ends_at: DateTime.now + 30.minutes,
  maximum_participants: 30,
  city: 'Quezon City',
  barangay: 'Santo Domingo',
  house: '#8 Kanto Tinio'
)

Event.create!(
  name: 'Operation Tuli',
  description: '51st Annual Operation Tuli',
  category: 'health',
  starts_at: DateTime.now + 2.days,
  ends_at: DateTime.now + 2.days + 30.minutes,
  maximum_participants: 33,
  city: 'Quezon City',
  barangay: 'Santa Maria',
  house: '#8 Gen. Trias Street'
)
