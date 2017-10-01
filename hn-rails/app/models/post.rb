class Post < ApplicationRecord
  belongs_to :user, optional: true
  has_many :votes, dependent: :destroy
  has_many :comments, dependent: :destroy

  def upvote
    self.votes.where(up: true).size
  end

  def downvote
    self.votes.where(up: false).size
  end

end
