import { Component, OnInit } from '@angular/core';

import { PostsService } from '../services/posts.service';

import Post from "../classes/post.class"

import User from "../classes/user.class"

import { AuthService } from "angular2-social-login";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  posts: Post[]
  page: number
  showText: string
  sortByTime: string
  constructor(
    private postsService: PostsService,
    public _auth: AuthService
  ) {
    this.sortByTime = "true"
  }

  ngOnInit() {
    this.restart()
  }

  signIn(provider){

    this._auth.login(provider).subscribe(
      (data) => {
                  console.log("mkmlkm",data);
                  //user data
                  //name, image, uid, provider, uid, email, token (accessToken for Facebook & google, no token for linkedIn), idToken(only for google)
                }
    )
  }

  logout(){
    this._auth.logout().subscribe(
      data => {
      }
    )
  }

  restart(){
    this.posts = []
    this.page = 1
    this.showText = "Show more"
    this.reload()
  }

  loadMore() {
    this.page ++
    this.reload()
  }

  reload() {
    console.log(this.sortByTime)
    this.postsService.getPosts(this.page, (this.sortByTime == "true") ).subscribe(
      data => {
        if(data.length <= 1){
          this.showText = "That's all"
        }
        for(let i in data){
          this.posts.push(new Post(data[i]))
        }
      }
    );
  }

}
