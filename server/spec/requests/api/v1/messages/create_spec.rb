# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Messages', type: :request do
  describe 'POST /api/v1/messages' do
    before(:each) do
      @user_volunteer = create(:user_volunteer)
      @user_organizer = create(:user_organizer)

      put '/api/v1/login', params: { email: @user_organizer.email, password: @user_organizer.password }
      post '/api/v1/events', params: event_params_no_dependency, headers:
      { Accept: 'application/json',
        Authorization: json['token'] }
      @event = Event.last
    end

    context 'with unauthorized user - unapproved volunteer' do
      it 'works!' do
        login_as(@user_volunteer)
        post '/api/v1/messages',
          params: { event_id: @event.id, user_id: @user_volunteer.id },
          headers: { Accept: 'application/json', Authorization: json['token'] }
        p response.body
        expect(response).to have_http_status(401)
      end
    end

    context 'with authorized user - organizer' do
      it 'works!' do
        login_as(@user_organizer)
        post '/api/v1/messages',
          params: { event_id: @event.id, user_id: @user_volunteer.id, body: 'hello world!' },
          headers: { Accept: 'application/json', Authorization: json['token'] }
        p response.body
        expect(response).to have_http_status(201)
      end
    end

    context 'with invalid params' do
      it 'works!' do
        login_as(@user_organizer)
        post '/api/v1/messages',
          params: { event_id: @event.id, user_id: @user_volunteer.id },
          headers: { Accept: 'application/json', Authorization: json['token'] }
        p response.body
        expect(response).to have_http_status(422)
      end
    end
  end
end
