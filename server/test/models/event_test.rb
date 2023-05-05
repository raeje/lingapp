# == Schema Information
#
# Table name: events
#
#  id                   :bigint           not null, primary key
#  name                 :string
#  description          :string
#  starts_at            :datetime
#  ends_at              :datetime
#  maximum_participants :integer
#  notes                :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
require "test_helper"

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
