# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Users::Achievements', type: :request do
  describe 'GET /api/v1/users/:id/achievements' do
    context 'with valid parameters' do
      let(:user_volunteer) { create(:user_volunteer) }

      before do
        login_as(user_volunteer)
        get "/api/v1/users/#{user_volunteer.id}/achievements", headers:
          { Accept: 'application/json',
            Authorization: json['token'] }
      end

      it 'works!' do
        expect(response).to render_template('api/v1/users/achievements')
      end
    end
  end
end
