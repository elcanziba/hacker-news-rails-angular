import { Component, OnInit, Input, Output } from '@angular/core';
import { PostsService } from '../services/posts.service';
import Comment from "../classes/comment.class"

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.sass'],
})
export class EditCommentComponent implements OnInit {
  @Input() comment: Comment
  @Input() editingMode: any
  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit() {
  }

  updateComment() {
    this.postsService.updateComment(this.comment).subscribe(
      data => {
        this.editingMode.value = false
        console.log(this.editingMode)
      }
    );
  }
}
