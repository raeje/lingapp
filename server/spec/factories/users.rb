# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  alias           :string
#  badge_title     :string
#  barangay        :string
#  city            :string
#  email           :string
#  first_name      :string
#  house           :string
#  landmark        :string
#  last_name       :string
#  password        :string
#  password_digest :string
#  role            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
FactoryBot.define do
  factory :user do
    # Additional Info
    city       { Faker::TvShows::GameOfThrones.city }
    barangay   { Faker::JapaneseMedia::Naruto.village }
    house      { "#{Faker::Address.secondary_address} #{Faker::Address.street_name}" }
    landmark   { "near #{Faker::Restaurant.name} Restaurant" }

    trait :user_volunteer do
      role { 'volunteer ' }
    end

    trait :volunteer do
      # Full name will be split into two
      full_name = Faker::TvShows::GameOfThrones.character
      # User Info
      first_name { full_name.split(' ').first }
      last_name  { full_name.split(' ').second || Faker::Name.last_name }
      # Account Info
      email      { "#{first_name}.#{last_name}@lingapp.com".downcase }
      password   { first_name }
      password_confirmation { first_name }
      role { 'volunteer' }
    end

    trait :organizer do
      # Full name will be split into two
      full_name = Faker::JapaneseMedia::Naruto.character
      # User Info
      first_name { full_name.split(' ').first }
      last_name  { full_name.split(' ').second || Faker::Name.last_name }
      # Account Info
      email      { "#{first_name}.#{last_name}@lingapp.com".downcase }
      password   { first_name }
      password_confirmation { first_name }
      role { 'organizer' }
    end

    factory :user_organizer, traits: [:organizer]
    factory :user_volunteer, traits: [:volunteer]
  end
end
