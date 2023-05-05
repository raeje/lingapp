# == Schema Information
#
# Table name: applicants
#
#  id          :bigint           not null, primary key
#  is_approved :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  event_id    :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_applicants_on_event_id  (event_id)
#  index_applicants_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#  fk_rails_...  (user_id => users.id)
#
require "test_helper"

class ApplicantTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
