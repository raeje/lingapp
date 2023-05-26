# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Events', type: :request do
  describe 'POST /api/v1/events/:id' do
    let(:user_volunteer) { create(:user_volunteer) }
    let(:user_organizer) { create(:user_organizer) }
    let(:event) { create(:event) }

    context 'with valid parameters' do
      before do
        login_as(user_organizer)
        patch "/api/v1/events/#{event.id}", params: { name: 'Still Tree Planting' }, headers:
          { Accept: 'application/json',
            Authorization: json['token'] }
      end

      it 'works!' do
        expect(response).to have_http_status(200)
      end
    end

    context 'with invalid parameters' do
      before do
        login_as(user_organizer)
        patch "/api/v1/events/#{event.id}", params: { name: nil }, headers:
          { Accept: 'application/json',
            Authorization: json['token'] }
      end

      it 'works!' do
        expect(response).to have_http_status(422)
      end
    end
  end
end
