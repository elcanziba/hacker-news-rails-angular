import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { WallComponent } from "./wall/wall.component"
import { PostFormComponent } from "./post-form/post-form.component"
import { JobsComponent } from "./jobs/jobs.component"
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard"
import { EditPostComponent } from "./edit-post/edit-post.component"
import { PostPageComponent } from "./post-page/post-page.component"
import { ManagePostsComponent } from "./manage-posts/manage-posts.component"
import { UsersComponent } from "./users/users.component"
import { OauthCallbackComponent } from "./oauth-callback/oauth-callback.component"
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'posts/manage',
    component: ManagePostsComponent
  },
  {
    path: 'oauth_callback', component: OauthCallbackComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wall/:id',
    component: WallComponent
  },
  {
    path: 'new',
    component: PostFormComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'post/:id',
    component: PostPageComponent
  },
  {
    path: 'post/:id/edit',
    component: EditPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
