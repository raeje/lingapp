# frozen_string_literal: true

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
class User < ApplicationRecord
  has_many :events_users
  has_many :events, through: :events_users
  has_many :messages, through: :events_users

  # Add methods to set and authenticate against a BCrypt password.
  include BCrypt
  include ActiveModel::Dirty

  # email validation
  validates(:email, presence: true, uniqueness: true)

  # password and password_confirmation validation
  validates(:password, presence: true, on: :create, confirmation: true)

  # address columns validation
  validates(:city, presence: true)
  validates(:barangay, presence: true)
  validates(:house, presence: true)

  # role validation
  validates(:role, presence: true)
  validates(:role, inclusion: { in: %w[organizer volunteer],
                                message: 'invalid role' })
  has_secure_password

  def self.encrypt_password(user_params)
    password_hash = Password.create(user_params[:password])
    create(email: user_params[:email], password: password_hash)
  end

  def scheduling_conflict?(new_event)
    @events_users = EventsUser.where(user_id: id)
    return if @events_users.empty?

    @events_users.each do |commitment|
      commitment = Event.find(commitment.event_id)
      if (new_event.starts_at.to_i..new_event.ends_at.to_i).overlaps?(commitment.starts_at.to_i..commitment.ends_at.to_i)
        return true
      end
    end

    false
  end
end
