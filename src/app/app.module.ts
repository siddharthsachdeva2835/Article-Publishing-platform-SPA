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

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GlobalFeedComponent } from './global-feed/global-feed.component';
import { YourFeedComponent } from './your-feed/your-feed.component';
import { TagFeedComponent } from './tag-feed/tag-feed.component';
import { NoAuthGuard } from './services/no-auth-guard.service';
import { MyarticlesComponent } from './myarticles/myarticles.component';
import { FavariclesComponent } from './favaricles/favaricles.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateArticleComponent } from './update-article/update-article.component';

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
    MyarticlesComponent,
    FavariclesComponent,
    UpdateArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
