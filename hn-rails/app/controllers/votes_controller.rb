class VotesController < ApplicationController
  before_action :set_vote, only: [:show, :update, :destroy]

  # GET /votes
  def index
    @votes = Vote.all

    render json: @votes
  end

  # GET /votes/1
  def show
    render json: @vote
  end

  # POST /votes
  def create
    @vote = current_user.votes.new(vote_params)
    if @vote.up
      @vote.post.update(
        score: (
          (@vote.post.votes.where(:up => true).size - @vote.post.votes.where(:up => false).size) +
          @vote.post.comments.size
        )
      )
    end
    if Vote.all.where(user: @vote.user).where(post: @vote.post).size > 0
      old = Vote.all.where(user: @vote.user).where(post: @vote.post).first
      puts old
      if old.up == @vote.up
        render json: @vote.post, status: :created, location: @vote
      else
        @vote.save
        old.destroy
        render json: @vote.post, status: :created, location: @vote
      end
    elsif @vote.save
      render json: @vote.post, status: :created, location: @vote
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /votes/1
  def update
    if @vote.update(vote_params)
      render json: @vote
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
  end

  # DELETE /votes/1
  def destroy
    @vote.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vote
      @vote = Vote.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def vote_params
      params.require(:vote).permit(:post_id, :up, :user_id)
    end
end
