Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:show]
  resources :journeys, only: [:show]


  namespace :api do
    namespace :v1 do
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
