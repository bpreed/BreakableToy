Rails.application.routes.draw do
  root 'events#index'
  devise_for :users, controllers: { registrations: 'registrations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :events, only: [:index]
  resources :users, only: [:show] do
    resources :teams, only: [:index]
  end

  resources :teams, only: [:index, :show, :new, :create]

  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :create]
      resources :favorites, only: [:create]
      resources :memberships, only: [:create]
      resources :users, only: [:show] do
        resources :teams, only: [:index]
      end
      resources :teams, only: [:show, :index, :create]
      namespace :search do
        resources :events, only: [:create]
      end
    end
  end
end
