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
require "test_helper"

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
