class User < ActiveRecord::Base
  # Include default devise modules.

  has_many :posts, dependent: :destroy
  has_many :votes, dependent: :destroy
  has_many :comments, dependent: :destroy
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable,
         :omniauthable
  include DeviseTokenAuth::Concerns::User
end
