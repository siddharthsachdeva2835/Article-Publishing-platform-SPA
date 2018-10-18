import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { UserService } from './../services/user.service';
import { ArticleService } from './../services/article.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.css']
})
export class GlobalFeedComponent implements OnInit, OnChanges {
  articles: Array<object>;
  date: Date;
  dateString: string;
  isAuth: boolean;

  constructor(private articleService: ArticleService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  likeArticle(article) {
    if ( !article.favorited ) {
      this.articleService.likeArticle(article.slug).pipe(map(res => res.json())).subscribe(data => {
        (this.articles.find(x => (x as any).slug === data.article.slug) as any).favorited = true;
        (this.articles.find(x => (x as any).slug === data.article.slug) as any).favoritesCount++;
      });
    } else {
      this.articleService.unlikeArticle(article.slug).pipe(map(res => res.json())).subscribe(data => {
        (this.articles.find(x => (x as any).slug === data.article.slug) as any).favorited = false;
        (this.articles.find(x => (x as any).slug === data.article.slug) as any).favoritesCount--;
      });
    }
  }

  ngOnInit() {
    this.articleService.getAllArticles().subscribe(data => {
      console.log(data);
      this.articles = data;
    });
    this.userService.isAuthenticated.subscribe(data => this.isAuth = data);
  }
  ngOnChanges() {
  }

}
