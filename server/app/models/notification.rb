# == Schema Information
#
# Table name: notifications
#
#  id         :bigint           not null, primary key
#  title      :string
#  body       :string
#  is_read    :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Notification < ApplicationRecord
  belongs_to :user
end
