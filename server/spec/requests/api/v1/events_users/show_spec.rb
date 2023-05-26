# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::EventsUsers', type: :request do
  describe 'GET /api/v1/events_users/:id' do
    before(:each) do
      @user_volunteer = create(:user_volunteer)
      @user_organizer = create(:user_organizer)

      put '/api/v1/login', params: { email: @user_organizer.email, password: @user_organizer.password }

      post '/api/v1/events', params: event_params_no_dependency, headers:
      { Accept: 'application/json',
        Authorization: json['token'] }
      @event = Event.last

      post '/api/v1/events_users', params: { event_id: @event.id, user_id: @user_volunteer.id }, headers: { Accept: 'application/json', Authorization: json['token'] }
      @events_user = EventsUser.last
    end

    context 'with valid parameters' do
      it 'works!' do
        login_as(@user_volunteer)
        get "/api/v1/events_users/#{@events_user.id}", headers:
          { Accept: 'application/json',
            Authorization: json['token'] }
        expect(response).to have_http_status(200)
      end
    end
  end
end
