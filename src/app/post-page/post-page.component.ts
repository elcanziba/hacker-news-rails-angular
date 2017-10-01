import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {Angular2TokenService} from "angular2-token";

import Post from '../classes/post.class'
import Comment from '../classes/comment.class'
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.sass']
})
export class PostPageComponent implements OnInit {
  post: Post
  newComment: Comment
  comments: Comment[]
  owner: boolean
  loaded: boolean
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    public authTokenService:Angular2TokenService,
    public authService:AuthService
  ) {
    this.loaded = false
    this.comments = []
    this.newComment = new Comment({})
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postsService.getPost(parseInt(params["id"])).subscribe(
        data => {
          this.post = new Post(data)
          this.owner = this.authService.userSignedIn$ && (this.authTokenService.currentUserData && this.authTokenService.currentUserData.id == this.post.user.id)
          this.loaded = true
          this.reloadComment()
        }
      );
    });
  }

  reloadComment() {
    this.comments = []
    this.postsService.getComments(this.post).subscribe(
      data => {
        for(let i in data){
          this.comments.push(new Comment(data[i]))
        }
        console.log(this.comments)
      }
    )
  }

  sendUpVote() {
    this.post.upVote()
    this.postsService.upVote(this.post).subscribe(
      data => {
        this.post.upvote  = data.upvote
        this.post.downvote = data.downvote
      }
    );
  }

  sendDownVote() {
    this.post.downVote()
    this.postsService.downVote(this.post).subscribe(
      data => {
        this.post.upvote  = data.upvote
        this.post.downvote = data.downvote
      }
    );
  }

  deletePost() {
    this.postsService.deletePost(this.post).subscribe(
      data => {
      }
    );
  }

  addComment(){
    this.postsService.addComment(this.post, this.newComment).subscribe(
      data => {
        console.log("new comment", data)
        this.newComment.content = ""
        this.reloadComment()
      }
    );
  }

}
