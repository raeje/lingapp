# frozen_string_literal: true

require 'rails_helper'
RSpec.describe 'Api::V1::Users', type: :request do
  describe 'PATCH /api/v1/users/:id' do
    let(:user_volunteer) { create(:user_volunteer) }

    context 'with valid parameters' do
      it 'works!' do
        login_as(user_volunteer)
        patch "/api/v1/users/#{user_volunteer.id}",
        params: { badge_title: 'The Pawtector' },
        headers:
          { Accept: 'application/json',
            Authorization: json['token'] }
        expect(response).to have_http_status(200)
      end
    end
  end
end
