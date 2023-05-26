# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Signup', type: :request do
  describe 'POST /api_v1_signup' do
    context 'with valid parameters' do
      let(:user_volunteer) { build(:user, :volunteer) }

      before do
        post api_v1_signup_path, params: user_params(user_volunteer)
      end

      it 'works!' do
        expect(response).to have_http_status(201)
      end
    end

    context 'with invalid parameters' do
      let(:user_volunteer) { build(:user) }

      before do
        post api_v1_signup_path, params: user_params(user_volunteer)
      end

      it 'works!' do
        expect(response).to have_http_status(422)
      end
    end

    context 'with mismatched password' do
      let(:user_volunteer) { build(:user, :volunteer) }

      before do
        post api_v1_signup_path, params: user_params(user_volunteer).merge(password_confirmation: '')
      end

      it 'works!' do
        expect(response).to have_http_status(422)
      end
    end
  end
end
