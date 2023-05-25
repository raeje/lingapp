# frozen_string_literal: true

module Api
  module V1
    # app/controller/api/v1/messages_controller.rb
    class MessagesController < ApplicationController
      protect_from_forgery
      before_action :authorize_request

      # POST /api/v1/messages
      def create
        events_user = EventsUser.find_by(event_id: params[:event_id], user_id:)
        if events_user.nil?
          render(json: { errors: { base: ['The chat group is exclusive to attendees only.'] } }, status: :unprocessable_entity)
          return
        end

        @message = Message.new(body: params[:body], events_user_id: events_user.id)
        if @message.save
          render(json: @message, status: :created)
        else
          render(json: { errors: @message.errors }, status: :unprocessable_entity)
        end
      end

      private

      def user_id
        @current_user.id
      end

      def messages_params
        params.permit(:body, :is_read)
      end
    end
  end
end
