# frozen_string_literal: true

module Api
  module V1
    # app/controller/api/v1/users_controller.rb
    class UsersController < ApplicationController
      protect_from_forgery with: :null_session
      before_action :authorize_request
      before_action :authorize_admin_action, only: %i[update create index]

      def index
        @users = User.all
        render json: { data: @users }
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

      # POST /api/v1/users/new
      def create
        @user = User.new(user_params)

        if @user.save
          render(json: { message: "User #{@user.email} created!" }, status: :created)
        else
          render(json: { errors: @user.errors }, status: :unprocessable_entity)
        end
      end

      private

      def user_params
        params.permit(:email,
                      :password,
                      :password_confirmation,
                      :role,
                      :first_name,
                      :last_name,
                      :alias,
                      :contact_number)
      end
    end
  end
end