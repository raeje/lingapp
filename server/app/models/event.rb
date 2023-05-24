# frozen_string_literal: true

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
class Event < ApplicationRecord
  has_many :events_users
  has_many :users, through: :events_users
  has_one_attached :image, dependent: :destroy

  after_commit :add_default_image, on: %i[create update]

  # name validation
  validates(:name, presence: true)

  # description validation
  validates(:description, presence: true)

  # address columns validation
  validates(:city, presence: true)
  validates(:barangay, presence: true)
  validates(:house, presence: true)

  # category validation
  validates(:category, presence: true)
  validates(:category, inclusion: { in: %w[environmental educational health social animal cultural disaster],
                                    message: 'invalid category' })

  # starts_at validation
  validates(:starts_at, presence: true)
  validates(:starts_at, comparison: { less_than: :ends_at })
  validates(:starts_at, comparison: { greater_than: DateTime.now })

  # ends_at validation
  validates(:ends_at, presence: true)
  validates(:ends_at, comparison: { greater_than: :starts_at })
  validates(:ends_at, comparison: { greater_than: DateTime.now })

  # maximum_participants validation
  validates(:maximum_participants, presence: true)

  scope :not_yet_started, -> { where('starts_at > ?', DateTime.now) }

  def concluded?
    ends_at < DateTime.now
  end

  def concluded_and_ongoing
    where('starts_at < ?', DateTime.now)
  end

  def approved_participants
    EventsUser.where('event_id = ? AND is_approved = ?', id, true).count
  end

  def pending_participants
    EventsUser.where('event_id = ? AND is_approved = ?', id, false).count
  end

  private

  def add_default_image
    unless image.attached?
      image.attach(io: File.open(Rails.root.join('app',
                                                 'assets',
                                                 'images',
                                                 'default_event_image.jpeg')),
                   filename: 'default_event_image.jpeg',
                   content_type: 'image/jpg')
    end
  end
end
