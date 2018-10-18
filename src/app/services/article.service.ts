import { UserService } from './user.service';
import { JwtService } from './jwt.service';
import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ArticleService implements OnInit {
  isAuth = false;
  constructor(private api: ApiService, private jwt: JwtService,
                ) { }

  addArticle(obj: object) {
    this.api.postRequest('/articles', obj, { headers: {Authorization: 'Token ' +  this.jwt.getToken()}})
                          .subscribe(data => console.log(data));
  }

  likeArticle(slug) {
    return this.api.postRequest(`/articles/${slug}/favorite`, {}, { headers: {Authorization: 'Token ' +  this.jwt.getToken()}});
  }

  unlikeArticle(slug) {
    return this.api.deleteRequest(`/articles/${slug}/favorite`, {}, { headers: {Authorization: 'Token ' +  this.jwt.getToken()}});
  }

  getAllArticlesByTag(tag: string) {
    if (this.jwt.getToken()) {
      console.log('authorized');
      return this.api.getRequest('/articles?tag=' + tag,
      { headers: {Authorization: 'Token ' +  this.jwt.getToken()}}).pipe(map(data => data.json().articles));
    } else {
      console.log('unauthorized');
      return this.api.getRequest('/articles?tag=' + tag).pipe(map(data => data.json().articles));
    }
  }
  getAllArticles() {
    if (this.jwt.getToken()) {
      console.log(this.isAuth);
      return this.api.getRequest('/articles',
         { headers: {Authorization: 'Token ' +  this.jwt.getToken()}}).pipe(map(data => data.json().articles));
    } else {
      console.log(this.isAuth);
      return this.api.getRequest('/articles').pipe(map(data => data.json().articles));
    }
  }

  ngOnInit() {
  }
}
