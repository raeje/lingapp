# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string
#  password        :string
#  first_name      :string
#  last_name       :string
#  alias           :string
#  password_digest :string
#  contact_number  :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_many :notifications
end
