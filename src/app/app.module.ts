import { AuthGuard } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth.shared/login/login.component';
import { SignupComponent } from './auth.shared/signup/signup.component';
import { HeaderComponent } from './layout.shared/header/header.component';
import { FooterComponent } from './layout.shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '../../node_modules/@angular/http';

import { ReactiveFormsModule } from '@angular/forms';
import { GlobalFeedComponent } from './global-feed/global-feed.component';
import { YourFeedComponent } from './your-feed/your-feed.component';
import { TagFeedComponent } from './tag-feed/tag-feed.component';
import { NoAuthGuard } from './services/no-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ArticleComponent,
    ProfileComponent,
    SettingComponent,
    NewArticleComponent,
    GlobalFeedComponent,
    YourFeedComponent,
    TagFeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
