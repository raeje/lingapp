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
      before_action only: %i[join] do
        authorize_action('volunteer')
      end

      # GET /api/v1/events
      def index
        @events = Event.not_yet_started
        render(json: @events, status: :ok)
      end

      # POST /api/v1/events
      def create
        @event = Event.new(event_params)

        if @event.save
          EventsUser.create(event_id: @event.id, user_id: @current_user.id, has_attended: true, is_approved: true)
          render(json: @event, status: :created)
        else
          render(json: { errors: @event.errors }, status: :unprocessable_entity)
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
        render(json: @event, status: :ok)
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
                      :category)
      end
    end
  end
end
