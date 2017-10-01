import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../services/posts.service';

import Comment from "../classes/comment.class"

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment
  editingMode: any
  showing: boolean

  constructor(
    private postsService: PostsService,
  ) {
    this.editingMode = {
      value: false
    }
    this.showing = true
  }

  ngOnInit() {
  }

  toggleEditing() {
    this.editingMode.value = !this.editingMode.value
  }

  delete(){
    this.postsService.deleteComment(this.comment).subscribe(
      data => {
        this.showing = false
      }
    );
  }

}
