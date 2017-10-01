import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

import User from '../classes/user.class'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  users: User[]
  page: number
  showText: string
  constructor(
    private postsService: PostsService,
  ) {
    this.users = []
    this.page = 0
    this.showText = "Show More"
  }

  ngOnInit() {
    this.loadMore()
  }

  loadMore() {
    this.page ++
    this.postsService.getUsers(this.page).subscribe(
      data => {
        if(data.length <= 14){
          this.showText = "That's all"
        }
        for(let i in data){
          this.users.push(new User(data[i]))
        }
        console.log(this.users)
      }
    );
  }

}
