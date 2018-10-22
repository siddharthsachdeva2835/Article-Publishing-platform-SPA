import { Router } from '@angular/router';
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
                private router: Router) { }

  addArticle(obj: object) {
    this.api.postRequest('/articles', obj, { headers: {Authorization: 'Token ' +  this.jwt.getToken()}})
                          .subscribe(data => console.log(data),
                                  () => {},
                                () => { this.router.navigate(['home/global']); });
  }

  updateArticle(slug: string, obj: object) {
    console.log(obj);
    this.api.putRequest('/articles/' + slug, obj)
                          .subscribe(data => console.log(data),
                                  () => {},
                                () => { this.router.navigate(['home/global']); });
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

  getArticle(slug: string) {
    if (this.jwt.getToken()) {
      return this.api.getRequest('/articles/' + slug,
      { headers: {Authorization: 'Token ' +  this.jwt.getToken()}}).pipe(map(data => data.json()));
    } else {
      console.log(slug);
      return this.api.getRequest('/articles/' + slug).pipe(map(data => data.json()));
    }
  }

  getComments(slug: string) {
    return this.api.getRequest('/articles/' + slug + '/comments',
    { headers: {Authorization: 'Token ' +  this.jwt.getToken()}}).pipe(map(data => data.json()));
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

  getMyArticles(username) {
      return this.api.getRequest('/articles?author=' + username).pipe(map(data => data.json().articles));
  }

  getFavArticles(username) {
    return this.api.getRequest('/articles?favorited=' + username).pipe(map(data => data.json().articles));
}

  getArticlesFeed() {
      console.log(this.isAuth);
      return this.api.getRequest('/articles/feed',
         { headers: {Authorization: 'Token ' +  this.jwt.getToken()}}).pipe(map(data => data.json().articles));
  }

  addComment(body: string, slug: string) {
    return this.api.postRequest('/articles/' + slug  + '/comments', { comment : { body: body}},
      { headers: {Authorization: 'Token ' +  this.jwt.getToken()}});
  }

  deleteComment(id: string, slug: string) {
    return this.api.deleteRequest('/articles/' + slug  + '/comments/' + id, {},
      { headers: {Authorization: 'Token ' +  this.jwt.getToken()}});
  }

  deleteArticle(slug) {
    return this.api.deleteRequest('/articles/' + slug,
    { headers: {Authorization: 'Token ' +  this.jwt.getToken()}});
  }

  ngOnInit() {
  }
}
