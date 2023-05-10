# frozen_string_literal: true

module Api
  module V1
    # app/controller/api/v1/events_users_controller.rb
    class EventsUsersController < ApplicationController
      protect_from_forgery
      before_action :authorize_request
      before_action only: %i[create destroy] do
        authorize_action('volunteer')
      end
      before_action only: %i[update] do
        authorize_action('organizer')
      end

      # GET /api/v1/events_users
      def index
        @events_users = EventsUser.all
        render(json: @events_users, status: :ok)
      end

      # GET /api/v1/events_users/:id
      def show
        @events_user = EventsUser.find(params[:id])
        render(json: @events_user, status: :ok)
      end

      # POST /api/v1/events_users
      def create
        @events_user = EventsUser.new(events_users_params)

        begin
          if @events_user.save
            render(json: @events_user, status: :created)
          else
            render(json: { errors: @events_user.errors }, status: :unprocessable_entity)
          end
        rescue ActiveRecord::RecordNotUnique
          render(json: { errors: 'You have already requested to join this event.' }, status: :unprocessable_entity)
        end
      end

      # DELETE /api/v1/events_users
      def destroy
        @events_user = EventsUser.find(params[:id])

        if @events_user.destroy
          render(json: { message: 'Record deleted.' }, status: :no_content)
        else
          render(json: { errors: @events_user.errors }, status: :unprocessable_entity)
        end
      end

      # PATCH /api/v1/events_users/:id
      def update
        @events_user = EventsUser.find(params[:id])

        if @events_user.update(events_users_update_params)
          render(json: @events_user, status: :ok)
        else
          render(json: { errors: @events_user.errors }, status: :unprocessable_entity)
        end
      end

      private

      def events_users_params
        { user_id: @current_user.id, event_id: params[:event_id] }
      end

      def events_users_update_params
        params.permit(:is_approved, :has_attended)
      end
    end
  end
end
