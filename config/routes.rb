Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :lines, only: [:index]
      resources :stops, only: [:index]
      post 'stops/search', to: 'stops#search'
    end
  end
end
