# frozen_string_literal: true

module Api
  module V1
    # app/controller/api/v1/user_notifications_controller.rb
    class UserNotificationsController < ApplicationController
      protect_from_forgery with: :null_session
      before_action :authorize_request
      # GET /api/v1/user_notifications
      def index
        @user_notifications = UserNotification.where(user_id: @current_user.id, is_read: [nil, false]).sort_by(&:created_at).reverse

        render(json: @user_notifications, status: :ok)
      end

      # PATCH /api/v1/user_notifications/:id
      def update
        @user_notification = UserNotification.find(params[:id])

        if @user_notification.update(is_read: params[:is_read])
          render(json: @user_notification, status: :ok)
        else
          render(json: { errors: @user_notification.errors }, status: :unprocessable_entity)
        end
      end
    end
  end
end
