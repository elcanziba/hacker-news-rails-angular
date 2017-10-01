import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Angular2TokenService} from "angular2-token";
import {AuthService} from "../services/auth.service";

import Post from "../classes/post.class"
import User from "../classes/user.class"
import Comment from "../classes/comment.class"
import 'rxjs/add/operator/map';

var URL = "http://localhost:3000"

@Injectable()
export class PostsService {

  constructor(
    private http: Http,
    public authTokenService:Angular2TokenService,
    public authService:AuthService
  ) {
  }

  getPosts(page: number, sortByTime: boolean) {
    return this.http.get(URL+"/posts.json?page="+page+"&s="+sortByTime)
      .map(
        ( res:Response ) => res.json()
      );
  }

  getPendingPosts(page: number, sortByTime: boolean) {
    return this.http.get(URL+"/posts/pending.json?page="+page+"&s="+sortByTime)
      .map(
        ( res:Response ) => res.json()
      );
  }

  getJobs(page: number) {
    return this.http.get(URL+"/jobs.json?page="+page)
      .map(
        ( res:Response ) => res.json()
      );
  }

  getPostsForUser(user: User, page:number) {
    return this.http.get(URL+"/posts/users/"+user.id+".json?page="+page)
      .map(
        ( res:Response ) => res.json()
      );
  }

  getPost(id: number) {
    return this.http.get(URL+"/posts/"+id+".json")
      .map(
        ( res:Response ) => res.json()
      );
  }

  approvePost(post: Post, approved: boolean) {
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.put(URL+"/posts/"+post.id+".json", {
      post: {
        approved: approved,
        checked: true
      }
    },{
      headers: headers
    }).map(( res:Response ) => res.json() );
  }

  addPost(post: Post) {
    var headers =  this.authTokenService.currentAuthHeaders;
    console.log(headers)
    return this.http.post(URL+"/posts.json", {
      post: {
        title: post.title,
        description: post.description,
        source: post.source,
        kind: post.kind
      }
    },{
      headers: headers
    }).map(( res:Response ) => res.json() );
  }

  addJob(post: Post) {
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.post(URL+"/posts.json", {
      post: {
        title: post.title,
        description: post.description,
        source: post.source,
        kind: false
      }
    },{
      headers: headers
    }).map(( res:Response ) => res.json() );
  }

  updatePost(post: Post) {
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.put(URL+"/posts/"+post.id+".json", {
      post: {
        title: post.title,
        description: post.description,
        source: post.source
      }
    },{
      headers: headers
    }).map(( res:Response ) => res.json() );
  }

  deletePost(post: Post) {
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.delete(URL+"/posts/"+post.id+".json",{
      headers: headers
    }).map(( res:Response ) => res.json() );
  }

  upVote(post: Post){
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.post(URL+"/votes.json", {
      vote: {
        up: true,
        post_id: post.id
      }
    },{
      headers: headers
    }).map(( res:Response ) => res.json() );
  }

  downVote(post: Post){
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.post(URL+"/votes.json", {
      vote: {
        up: false,
        post_id: post.id
      }
    },{
      headers: headers
    }).map(( res:Response ) => res.json() );
  }

  getComments(post: Post) {
    return this.http.get(URL+"/posts/"+post.id+"/comments.json")
      .map(
        ( res:Response ) => res.json()
      );
  }

  addComment(post: Post, comment: Comment){
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.post(URL+"/comments.json", {
      comment: {
        post_id: post.id,
        content: comment.content
      }
    },{
      headers: headers
    }).map(( res:Response ) => res.json() );
  }

  updateComment(comment: Comment){
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.put(URL+"/comments/"+comment.id+".json", {
      comment: {
        content: comment.content
      }
    },{
      headers: headers
    }).map(( res:Response ) => res.json() );
  }

  deleteComment(comment: Comment){
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.delete(URL+"/comments/"+comment.id+".json",{
      headers: headers
    }).map(( res:Response ) => res.json() );
  }

  getUsers(page: number) {
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.get(URL+"/users.json?page="+page, {
      headers: headers
    })
      .map(
        ( res:Response ) => res.json()
      );
  }

  blockUser(user: User){
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.put(URL+"/users/"+user.id+".json",{
      user: {
        blocked: user.blocked
      }
    },{
      headers: headers
    })
      .map(
        ( res:Response ) => res.json()
      );
  }

  makeAUserAnAdmin(user: User){
    var headers =  this.authTokenService.currentAuthHeaders;
    return this.http.put(URL+"/users/"+user.id+".json",{
      user: {
        admin: user.admin
      }
    },{
      headers: headers
    })
      .map(
        ( res:Response ) => res.json()
      );
  }

}
