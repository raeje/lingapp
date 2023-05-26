# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Login', type: :request do
  describe 'PUT /api/v1/login' do
    context 'with valid parameters' do
      let(:user_volunteer) { create(:user_volunteer) }

      before do
        login_as(user_volunteer)
      end

      it 'works!' do
        expect(response).to have_http_status(200)
      end
    end

    context 'with invalid parameters' do
      let(:user_volunteer) { create(:user_volunteer) }

      before do
        login_as(user_volunteer, 'iNcorReCT%pasSWoRD')
      end

      it 'works!' do
        expect(response).to have_http_status(404)
      end
    end

    context 'without parameters' do
      let(:user_volunteer) { create(:user_volunteer) }

      before do
        put '/api/v1/login', params: { email: '', password: '' }
      end

      it 'works!' do
        expect(response).to have_http_status(401)
      end
    end
  end
end
