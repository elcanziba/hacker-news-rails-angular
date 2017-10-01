import { Component, OnInit, ViewChild } from '@angular/core';
import Post from '../classes/post.class'
import { PostsService } from '../services/posts.service';
import {AuthService} from "../services/auth.service";
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import { Angular2TokenService } from "angular2-token";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass']
})
export class PostFormComponent implements OnInit {
  post: Post

  constructor(
    private postsService: PostsService,
    public authService:AuthService,
    private router:Router,
    private authTokenService:Angular2TokenService
  ) {
    this.post = new Post({

    })
  }
  @ViewChild('authDialog') authDialog: AuthDialogComponent;

  ngOnInit() {
    var $this = this;


    console.log(this.authTokenService.userSignedIn(), this.authTokenService.currentAuthData)
    if(this.authTokenService.userSignedIn()){
    }else{
      setTimeout(function(){
        $this.presentAuthDialog()
      },1000)
    }
  }

  presentAuthDialog(mode?: 'login'| 'register'){
    this.authDialog.openDialog(mode);
  }

  addPost() {
    var $this = this;
    console.log(this.authTokenService.userSignedIn(), this.authTokenService.currentAuthData)
    if(this.authTokenService.userSignedIn()){
      if(this.post.kind.toString() == "true"){
        this.post.kind = true
      }else{
        this.post.kind = false
      }
      console.log(this.post)
      this.postsService.addPost(this.post).subscribe(
        data => {
          console.log(data)
          $this.router.navigateByUrl("/post/"+data.id)
        }
      );
    }else{
      $this.presentAuthDialog()
    }
  }

}
