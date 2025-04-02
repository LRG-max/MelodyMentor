Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"

  resources :compositions, only: [:create, :index, :new, :show]

  resources :preferences, only: [:new, :index, :create]

  get "up" => "rails/health#show", as: :rails_health_check
end
