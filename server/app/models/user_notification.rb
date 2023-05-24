# == Schema Information
#
# Table name: user_notifications
#
#  id         :bigint           not null, primary key
#  body       :string
#  is_read    :boolean
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_user_notifications_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class UserNotification < ApplicationRecord
  belongs_to :user

end
