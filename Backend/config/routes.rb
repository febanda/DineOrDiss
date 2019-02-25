Rails.application.routes.draw do
  resources :matches
  resources :restaurants
  get :'users/profile', to: 'users#profile'

  resources :users
  resource :auth, only: [:create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
