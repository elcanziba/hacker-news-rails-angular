class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy, :comments]
  before_action :authenticate_user!, only: [:create, :update, :destroy]


  # GET /posts
  def index
    if params[:s] == "true"
      @posts = Post.all.where(kind: true).order(:created_at => "DESC").where(:approved => true)
    else
      @posts = Post.all.where(kind: true).order(:score => "DESC").where(:approved => true)
    end

    @posts = @posts.paginate(:page => params[:page], :per_page => ( (params[:page] and params[:page].to_i > 1) ? 10 : 15 )).map{ |e| {
        :id => e.id,
        :title => e.title,
        :description => e.description,
        :upvote => e.upvote,
        :downvote => e.downvote,
        :source => e.source,
        :origin => origin(e),
        :user => {
          :email => e.user.email,
          :nickname => e.user.nickname,
          :id => e.user.id
        }
      }
    }
    render json: @posts
  end

  def origin(e)
    begin
      origin = e.source[(e.source.index("://")+3)..(e.source[(e.source.index("://")+3)..e.source.size].index("/")+ e.source.index("://")+2)]
    rescue
      origin = ""
    end
  end
  # GET /posts
  def pending
    @posts = Post.all.order(:created_at => "DESC").where(:approved => false).where(:checked => false)

    @posts = @posts.paginate(:page => params[:page], :per_page => ( (params[:page] and params[:page].to_i > 1) ? 10 : 15 )).map{ |e| {
        :id => e.id,
        :title => e.title,
        :description => e.description,
        :upvote => e.upvote,
        :downvote => e.downvote,
        :to_approve => true,
        :source => e.source,
        :kind => e.kind,
        :origin => origin(e),
        :user => {
          :email => e.user.email,
          :nickname => e.user.nickname,
          :id => e.user.id
        }
      }
    }
    render json: @posts
  end

  def jobs
    @posts = Post.all.where(kind: false).where(:approved => true)

    @posts = @posts.paginate(:page => params[:page], :per_page => ( (params[:page] and params[:page].to_i > 1) ? 10 : 15 )).map{ |e| {
        :id => e.id,
        :title => e.title,
        :description => e.description,
        :source => e.source,
        :origin => origin(e),
        :user => {
          :email => e.user.email,
          :nickname => e.user.nickname,
          :id => e.user.id
        }
      }
    }
    render json: @posts
  end

  def comments
    render json: @post.comments.order(:created_at => "DESC").map { |e| {
        :content => e.content,
        :id => e.id,
        :user => {
          :email => e.user.email,
          :nickname => e.user.nickname,
          :id => e.user.id
        }
      }
    }
  end

  def users
    @posts = User.find(params[:id]).posts.where(:approved => true)
    @posts = @posts.paginate(:page => params[:page], :per_page => ( (params[:page] and params[:page].to_i > 1) ? 10 : 15 )).map{ |e| {
        :id => e.id,
        :title => e.title,
        :description => e.description,
        :upvote => e.upvote,
        :downvote => e.downvote,
        :source => e.source,
        :origin => origin(e),
        :user => {
          :email => e.user.email,
          :nickname => e.user.nickname,
          :id => e.user.id
        }
      }
    }
    render json: @posts
  end

  # GET /posts/1
  def show
    e = @post
    render json: {
        :id => e.id,
        :title => e.title,
        :description => e.description,
        :upvote => e.upvote,
        :downvote => e.downvote,
        :source => e.source,
        :origin => origin(e),
        :approved => e.approved,
        :user => {
          :email => e.user.email,
          :nickname => e.user.nickname,
          :id => e.user.id
        }
      }
  end

  # POST /posts
  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:post).permit(:vues, :title, :description, :source, :upvote, :downvote, :kind, :approved, :checked)
    end
end
