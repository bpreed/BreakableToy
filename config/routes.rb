Rails.application.routes.draw do
  root 'events#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :events, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :events, only: [:index]
      namespace :search do
        resources :events, only: [:create]
      end
    end
  end
end
