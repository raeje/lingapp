# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  alias           :string
#  barangay        :string
#  city            :string
#  contact_number  :string
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
require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
