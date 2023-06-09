# frozen_string_literal: true

module Api
  module V1
    # app/controller/api/v1/events_controller.rb
    class EventsController < ApplicationController
      protect_from_forgery with: :null_session
      before_action :authorize_request
      before_action only: %i[create update] do
        authorize_action('organizer')
      end

      # GET /api/v1/events
      def index
        @events = Event.not_yet_started.sort_by(&:created_at).reverse
      end

      # POST /api/v1/events
      def create
        event = Event.new(event_params)

        if @current_user.scheduling_conflict?(event)
          render(json: { errors: ['Scheduling conflict.'] }, status: :unprocessable_entity)
        elsif event.save
          events_user, user_notification = CreateEventWithEventsUserAndUserNotification.call(event, user_id)
          render(json: { event:, events_user:, user_notification: }, status: :created)
        else
          render(json: { errors: event.errors }, status: :unprocessable_entity)
        end
      end

      # PATCH /api/v1/events/:id
      def update
        @event = Event.not_yet_started.find(params[:id])

        if @event.update(event_params)
          render(json: @event, status: :ok)
        else
          render(json: { errors: @event.errors }, status: :unprocessable_entity)
        end
      end

      # GET /api/v1/events/:id
      def show
        @event = Event.not_yet_started.find(params[:id])
      end

      # Custom routes
      # GET /api/v1/events/:id/guest_list
      def guest_list
        @event = Event.not_yet_started.find(params[:id])
      end

      # GET /api/v1/events/:id/messages
      def messages
        @event = Event.not_yet_started.find(params[:id])
      end

      private

      def event_params
        params.permit(:name,
                      :description,
                      :starts_at,
                      :ends_at,
                      :maximum_participants,
                      :notes,
                      :barangay,
                      :city,
                      :house,
                      :category,
                      :image)
      end

      def user_id
        @current_user.id
      end
    end
  end
end
