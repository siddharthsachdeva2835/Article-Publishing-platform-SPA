import { YourFeedComponent } from './your-feed/your-feed.component';
import { SignupComponent } from './auth.shared/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { ArticleComponent } from './article/article.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { NewArticleComponent } from './new-article/new-article.component';
import { LoginComponent } from './auth.shared/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { NoAuthGuard } from './services/no-auth-guard.service';
import { GlobalFeedComponent } from './global-feed/global-feed.component';
import { TagFeedComponent } from './tag-feed/tag-feed.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/global' , pathMatch: 'full'},

  { path: 'home', component: HomeComponent, children: [
    { path: 'your', component: YourFeedComponent, canActivate: [AuthGuard] },
    { path: 'global', component: GlobalFeedComponent},
    { path: 'tag/:id', component: TagFeedComponent}
  ]},

  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'new-article', component: NewArticleComponent, canActivate: [AuthGuard]},
  { path: 'article/:slug', component: ArticleComponent},

  { path: 'auth', component: AuthComponent , children: [
    { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
    { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard]},
  ]},

  { path: '**' , redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
