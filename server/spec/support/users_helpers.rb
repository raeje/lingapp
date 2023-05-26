# frozen_string_literal: true

module UsersHelpers
  def user_params(user)
    {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
      role: user.role,
      city: user.city,
      barangay: user.barangay,
      house: user.house,
      landmark: user.landmark
    }
  end
end
