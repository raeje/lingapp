# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Events', type: :request do
  describe 'GET /api/v1/events/:id/messages' do
    let(:user_volunteer) { create(:user_volunteer) }
    let(:user_organizer) { create(:user_organizer) }

    # If 'create' method is used, the event created
    # would not have a 'user_id'
    let(:event) do
      # Login request for organizer
      put '/api/v1/login', params: { email: user_organizer.email, password: user_organizer.password }
      # Create request for event (with logged in organizer cred)
      post '/api/v1/events', params: event_params_no_dependency, headers:
      { Accept: 'application/json',
        Authorization: json['token'] }
      # Get the last created item
      Event.last
    end

    context 'with valid parameters' do
      it 'works!' do
        p '--------------------'
        p event
        p '--------------------'
        login_as(user_organizer)
        get "/api/v1/events/#{event.id}/messages", headers:
          { Accept: 'application/json',
            Authorization: json['token'] }
        expect(response).to have_http_status(200)
      end
    end
  end
end
