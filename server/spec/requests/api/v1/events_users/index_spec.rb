# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::EventsUsers', type: :request do
  describe 'GET /api/v1/events_users' do
    let(:user_volunteer) { create(:user_volunteer) }

    before do
      login_as(user_volunteer)
      get '/api/v1/events_users', headers:
        { Accept: 'application/json',
          Authorization: json['token'] }
    end

    it 'works!' do
      expect(response).to have_http_status(200)
    end
  end
end
