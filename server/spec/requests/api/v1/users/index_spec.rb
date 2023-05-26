# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  describe 'GET /api/v1/users' do
    it 'works! (now write some real specs)' do
      get '/api/v1/users'
      expect(response).to have_http_status(401)
    end
  end
end
