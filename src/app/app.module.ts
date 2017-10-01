import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { FormsModule } from '@angular/forms'
import { Angular2SocialLoginModule } from "angular2-social-login";

import { HttpModule } from '@angular/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterializeModule } from 'angular2-materialize';

import { Angular2TokenService } from 'angular2-token';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

import {AuthService} from "./services/auth.service";
import { ProfileComponent } from './profile/profile.component';

import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard"
import { PostsService } from './services/posts.service';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { WallComponent } from './wall/wall.component';
import { PostFormComponent } from './post-form/post-form.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './job/job.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostPageComponent } from './post-page/post-page.component';
import { CommentComponent } from './comment/comment.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { ManagePostsComponent } from './manage-posts/manage-posts.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { FacebookloginComponent } from './facebooklogin/facebooklogin.component';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { OauthCallbackComponent } from './oauth-callback/oauth-callback.component';


let providers = {
  "facebook": {
      "clientId": "250785145421710",
      "apiVersion": "v2.5" ,
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
    },
    "google": {
      "clientId": "232299641814-fi1qs340bg3mgaabuo9lkvq91ri080o2.apps.googleusercontent.com"
    },
  };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    PostComponent,
    PostsComponent,
    WallComponent,
    PostFormComponent,
    JobsComponent,
    JobComponent,
    EditPostComponent,
    PostPageComponent,
    CommentComponent,
    EditCommentComponent,
    ManagePostsComponent,
    UsersComponent,
    UserComponent,
    FacebookloginComponent,
    ManagePostComponent,
    OauthCallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
    Angular2SocialLoginModule
  ],
  providers: [
    Angular2TokenService,
    AuthService,
    AuthGuard,
    PostsService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);
