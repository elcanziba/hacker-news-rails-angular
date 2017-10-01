import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import Post from '../classes/post.class'
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.sass']
})
export class JobsComponent implements OnInit {
  posts: Post[]
  showText: string
  page: number
  constructor(
    private postsService: PostsService,
  ) {
    this.posts = []
    this.showText = "Show More"
    this.page = 0
  }

  ngOnInit() {
    this.loadMore()
  }

  loadMore() {
    this.page ++
    this.postsService.getJobs(this.page).subscribe(
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
