import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../services/posts.service';

import Post from '../classes/post.class'
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {
  @Input() posts: Post[]

  constructor(
    private postsService: PostsService
  ) {
    this.posts = []
  }

  ngOnInit() {

  }

}
