# frozen_string_literal: true

module Api
  module V1
    # app/controller/api/v1/messages_controller.rb
    class MessagesController < ApplicationController
      protect_from_forgery
      before_action :authorize_request

      # GET /api/v1/messages
      def index
        events_user_id = params[:events_user_id]

        if Message.user_approved?(events_user_id)
          @messages = Message.where(events_user_id:)
          render(json: @messages, status: :ok)
        else
          render(json: { errors: { base: ['The chat group is exclusive to attendees only.'] } }, status: :unprocessable_entity)
        end
      end

      # POST /api/v1/messages
      def create
        @message = Message.new(messages_params)

        if @message.save
          render(json: @message, status: :created)
        else
          render(json: { errors: @message.errors }, status: :unprocessable_entity)
        end
      end

      private

      def messages_params
        params.permit(:body, :is_read, :events_user_id)
      end
    end
  end
end
