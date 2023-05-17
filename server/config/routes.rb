# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Authentication
      post 'signup' => 'authentication#signup'
      put  'login'  => 'authentication#login'

      # Users
      get   'users'     => 'users#index'
      patch 'users/:id' => 'users#update'
      # post 'users/new' => 'users#create'

      # Events
      get   'events'     => 'events#index'
      post  'events'     => 'events#create'
      get   'events/:id' => 'events#show'
      patch 'events/:id' => 'events#update'

      # EventsUser
      get    'events_users'     => 'events_users#index'
      post   'events_users'     => 'events_users#create'
      delete 'events_users/:id' => 'events_users#destroy'
      get    'events_users/:id' => 'events_users#show'
      patch  'events_users/:id' => 'events_users#update'
    end
  end
end