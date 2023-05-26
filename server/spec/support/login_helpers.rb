# frozen_string_literal: true

module LoginHelpers
  def login_as(user, incorrect_password = nil)
    puts '==============================================='
    puts '  LoginHelpers'
    puts "  First: #{user.first_name}"
    puts "  Last:  #{user.last_name}"
    puts "  Email: #{user.email}"
    puts "  Role:  #{user.role}"
    puts '==============================================='
    put '/api/v1/login', params: { email: user.email, password: incorrect_password || user.password }
  end
end
