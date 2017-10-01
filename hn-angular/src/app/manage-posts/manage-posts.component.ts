
import { Component, OnInit } from '@angular/core';

import { PostsService } from '../services/posts.service';

import Post from "../classes/post.class"

import User from "../classes/user.class"


@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.sass']
})
export class ManagePostsComponent implements OnInit {
  posts: Post[]
  page: number
  showText: string
  sortByTime: string
  constructor(
    private postsService: PostsService
  ) {
    this.sortByTime = "true"
  }

  ngOnInit() {
    this.restart()
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
    this.postsService.getPendingPosts(this.page, (this.sortByTime == "true") ).subscribe(
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
