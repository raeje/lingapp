# == Schema Information
#
# Table name: events
#
#  id                   :bigint           not null, primary key
#  barangay             :string
#  category             :string
#  city                 :string
#  description          :string
#  ends_at              :datetime
#  house                :string
#  landmark             :string
#  maximum_participants :integer
#  name                 :string
#  notes                :string
#  starts_at            :datetime
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
FactoryBot.define do
  factory :event do
    # Basic info Faker::Mountain.range
    name        { "Tree Planting at #{Faker::Mountain.name}" }
    description { 'Plant trees at the specified location.' }
    category    { 'environmental' }
    maximum_participants { 33 }
    # Event date
    starts_at { 3.days.from_now }
    ends_at   { starts_at + 3.hours }
    # Event location
    city       { Faker::TvShows::GameOfThrones.city }
    barangay   { Faker::JapaneseMedia::Naruto.village }
    house      { "#{Faker::Address.secondary_address} #{Faker::Address.street_name}" }
    landmark   { "near #{Faker::Restaurant.name} Restaurant" }
  end
end
