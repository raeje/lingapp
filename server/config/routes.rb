# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Authentication
      post 'signup' => 'authentication#signup'
      put  'login'  => 'authentication#login'

      # Users
      get   'users'                  => 'users#index'
      patch 'users/:id'              => 'users#update'
      get   'users/:id'              => 'users#show'
      # Users custom route
      get   'users/:id/achievements' => 'users#achievements'

      # Events
      get   'events'     => 'events#index'
      post  'events'     => 'events#create'
      get   'events/:id' => 'events#show'
      patch 'events/:id' => 'events#update'
      # Events custom route
      get 'events/:id/guest_list' => 'events#guest_list'
      get 'events/:id/messages'   => 'events#messages'

      # EventsUser
      get    'events_users'           => 'events_users#index'
      post   'events_users'           => 'events_users#create'
      delete 'events_users/:event_id' => 'events_users#destroy'
      get    'events_users/:id'       => 'events_users#show'
      patch  'events_users/:id'       => 'events_users#update'

      # UserNotification
      get 'user_notifications'       => 'user_notifications#index'
      patch 'user_notifications/:id' => 'user_notifications#update'

      # Message
      post 'messages' => 'messages#create'
    end
  end
end
