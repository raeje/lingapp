# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::EventsUsers', type: :request do
  describe 'POST /api/v1/events_users' do
    before(:each) do
      @user_volunteer = create(:user_volunteer)
      @user_organizer = create(:user_organizer)

      put '/api/v1/login', params: { email: @user_organizer.email, password: @user_organizer.password }
      post '/api/v1/events', params: event_params_no_dependency, headers:
      { Accept: 'application/json',
        Authorization: json['token'] }
      @event = Event.last
    end

    context 'with authorized user & valid params - volunteer' do
      it 'works!' do
        login_as(@user_volunteer)
        post '/api/v1/events_users',
          params: { event_id: @event.id, user_id: @user_volunteer.id },
          headers: { Accept: 'application/json', Authorization: json['token'] }
        expect(response).to have_http_status(201)
      end
    end

    context 'with authorized user & invalid params - volunteer' do
      it 'works!' do
        login_as(@user_volunteer)
        post '/api/v1/events_users',
          params: { event_id: @event.id, user_id: @event.id },
          headers: { Accept: 'application/json', Authorization: json['token'] }
        expect(response).to have_http_status(422)
      end
    end

    context 'with unauthorized user - organizer' do
      it 'works!' do
        login_as(@user_organizer)
        post '/api/v1/events_users',
          params: { event_id: @event.id, user_id: @user_organizer.id },
          headers:
          { Accept: 'application/json',
            Authorization: json['token'] }
        expect(response).to have_http_status(401)
      end
    end

    context 'with duplicate index(event_id & user_id)' do
      it 'works!' do
        login_as(@user_volunteer)
        post '/api/v1/events_users',
          params: { event_id: @event.id, user_id: @user_volunteer.id },
          headers: { Accept: 'application/json', Authorization: json['token'] }

        login_as(@user_volunteer)
        post '/api/v1/events_users',
          params: { event_id: @event.id, user_id: @user_volunteer.id },
          headers: { Accept: 'application/json', Authorization: json['token'] }

        expect(response).to have_http_status(422)
      end
    end
  end
end
