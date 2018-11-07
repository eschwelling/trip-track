Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # resources :users, only: [:show]
  get '/home', to: 'users#show'
  # get '/users/sign_out', to: "devise/sessions#destroy"
    # get '/users/sign_out', to: "homes#index"
    # get '/users/sign_in', to: 'devise/sessions#new'
    # get '/users/sign_up', to: 'devise/registrations#new'
  resources :journeys, only: [:show]

  namespace :api do
    namespace :v1 do
        resources :users, only: [:index]
        resources :lines, only: [:index]
        resources :stops, only: [:index]
        get '/stops/search', to: 'stops#search'
        resources :journeys, only: [:index, :create, :show, :destroy] do
          resources :notes, only: [:index, :create]
          resources :trips, only: [:index, :create, :show]
      end
    end
  end
end
