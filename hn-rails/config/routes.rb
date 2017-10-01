Rails.application.routes.draw do
  resources :votes
  resources :comments
  resources :users

  resources :posts do
    collection do
      get "users/:id" => 'posts#users'
      get "pending"
    end
    member do
      get "comments" => 'posts#comments'
    end
  end

  get 'jobs' => 'posts#jobs'
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
