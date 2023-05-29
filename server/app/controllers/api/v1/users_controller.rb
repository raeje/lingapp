# frozen_string_literal: true

module Api
  module V1
    # app/controller/api/v1/users_controller.rb
    class UsersController < ApplicationController
      protect_from_forgery with: :null_session
      before_action :authorize_request

      # GET /api/v1/users/update/:id
      def show
        @user = User.find(params[:id])
        render(json: { id: @user.id, email: @user.email, first_name: @user.first_name,
                       last_name: @user.last_name, role: @user.role, badge_title: @user.badge_title }, status: :ok)
      end

      # PATCH /api/v1/users/update/:id
      def update
        @user = User.find(params[:id])
        if @user.update(user_params)
          render(json: { message: "User #{@user.email} updated." }, status: :ok)
        else
          render(json: { errors: @user.errors }, status: :unprocessable_entity)
        end
      end

      # Custom routes
      # GET /api/v1/users/:id/achievements
      def achievements
        @user = User.find(params[:id])
      end

      private

      def user_params
        params.permit(:id,
                      :email,
                      :password,
                      :password_confirmation,
                      :role,
                      :first_name,
                      :last_name,
                      :alias,
                      :badge_title)
      end
    end
  end
end
