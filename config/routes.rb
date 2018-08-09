Rails.application.routes.draw do
  root 'events#index'
  devise_for :users, controllers: { registrations: 'registrations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :events, only: [:index]
  resources :users, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :create]
      resources :favorites, only: [:create]
      namespace :search do
        resources :events, only: [:create]
      end
    end
  end
end
