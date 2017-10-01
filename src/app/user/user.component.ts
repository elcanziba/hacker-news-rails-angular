import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../services/posts.service';

import User from '../classes/user.class'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  @Input() user: User
  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit() {
  }

  blockUser() {
    this.user.blocked = !this.user.blocked
    this.postsService.blockUser(this.user).subscribe(
      data => {
        if(data != false)
          this.user.blocked = data.blocked
      }
    )
  }

  admin() {
    this.user.admin = !this.user.admin
    this.postsService.makeAUserAnAdmin(this.user).subscribe(
      data => {
        if(data != false)
          this.user.admin = data.admin
      }
    )
  }

}
