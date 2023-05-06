# frozen_string_literal: true

module Api
  module V1
    # app/controller/api/v1/attendances_controller.rb
    class AttendancesController < ApplicationController
      protect_from_forgery
      before_action :authorize_request
      before_action only %i[update show] do
        authorize_action('organizer')
      end
    end
  end
end
