import { UserService } from './../services/user.service';
import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute  } from '../../../node_modules/@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-your-feed',
  templateUrl: './your-feed.component.html',
  styleUrls: ['./your-feed.component.css']
})
export class YourFeedComponent implements OnInit {
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
    this.articleService.getArticlesFeed().subscribe(data => {
      this.articles = data;
    });
    this.userService.isAuthenticated.subscribe(data => this.isAuth = data);
  }
}
