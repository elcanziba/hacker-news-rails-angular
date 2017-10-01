import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../services/posts.service';

import Post from '../classes/post.class'
import {AuthService} from "../services/auth.service";
import {Angular2TokenService} from "angular2-token";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  @Input() post: Post
  showen: boolean
  owner: boolean
  constructor(
    public authTokenService:Angular2TokenService,
    public authService:AuthService,
    private postsService: PostsService
  ) {
    this.showen = true;
  }

  ngOnInit() {
    console.log(this.post)
    this.owner = (this.authTokenService.currentUserData && (this.authTokenService.currentUserData.id == this.post.user.id || this.authTokenService.currentUserData["admin"]))
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
        this.showen = false
      }
    );
  }

  approve() {
    this.postsService.approvePost(this.post, true).subscribe(
      data => {
        this.showen = false
      }
    );
  }

  disapprove() {
    this.postsService.approvePost(this.post, false).subscribe(
      data => {
        this.showen = false
      }
    );
  }
}
