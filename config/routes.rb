Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"

  resources :compositions, only: [:create, :index, :destroy, :new, :show]
  resources :compositions do
    member do
      post :save_audio
    end
  end

  resources :challenges, only: [:index, :show]
  get "/random_challenge", to: "challenges#random", as: :random_challenge

  resources :preferences, only: [:new, :index, :create]

  get "up" => "rails/health#show", as: :rails_health_check
end
