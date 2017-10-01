import { Component, OnInit } from '@angular/core';
import Post from '../classes/post.class'
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})
export class EditPostComponent implements OnInit {
  post: Post
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postsService.getPost(parseInt(params["id"])).subscribe(
        data => {
          this.post = new Post(data)
        }
      );
    });
  }

  updatePost() {
    this.postsService.updatePost(this.post).subscribe(
      data => {
        console.log(data)
      }
    );
  }

}
