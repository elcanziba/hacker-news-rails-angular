class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :banned?



  def banned?
    if current_user and current_user.blocked
      sign_out current_user
      render json: false
    end
  end
end
