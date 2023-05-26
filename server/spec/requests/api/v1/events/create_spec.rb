# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Events', type: :request do
  describe 'POST /api/v1/events' do
    let(:user_volunteer) { create(:user_volunteer) }
    let(:user_organizer) { create(:user_organizer) }
    let(:event) { build(:event) }

    context 'with valid parameters' do
      before do
        login_as(user_organizer)
        post '/api/v1/events', params: event_params, headers:
          { Accept: 'application/json',
            Authorization: json['token'] }
      end

      it 'works!' do
        expect(response).to have_http_status(201)
      end
    end

    context 'with invalid parameters' do
      before do
        login_as(user_organizer)
        post '/api/v1/events', params: event_basic_info_params, headers:
          { Accept: 'application/json',
            Authorization: json['token'] }
      end

      it 'works!' do
        expect(response).to have_http_status(422)
      end
    end

    context 'with scheduling conflict' do
      it 'works!' do
        login_as(user_organizer)
        post '/api/v1/events', params: event_basic_info_params, headers:
          { Accept: 'application/json',
            Authorization: json['token'] }

        # Create second event - this must result to error
        login_as(user_organizer)
        post '/api/v1/events', params: event_basic_info_params, headers:
        { Accept: 'application/json',
          Authorization: json['token'] }
        expect(response).to have_http_status(422)
      end
    end
  end
end
