import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';

import Post from "../classes/post.class"
import User from "../classes/user.class"

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.sass']
})
export class WallComponent implements OnInit {
  posts: Post[]
  user: User
  page: number
  showText: string

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {
    this.page = 0
    this.posts = []
    this.showText = "Show more"
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.user = new User({
         id: params["id"]
       }); // (+) converts string 'id' to a number
       this.loadMore()

       // In a real app: dispatch action to load the details here.
    });
  }

  loadMore() {
    this.page ++
    this.postsService.getPostsForUser(this.user, this.page).subscribe(
      data => {
        if(data.length <= 1){
          this.showText = "That's all"
        }
        for(let i in data){
          this.posts.push(new Post(data[i]))
        }
        this.user = new User(this.posts[0].user)
      }
    );
  }

}
