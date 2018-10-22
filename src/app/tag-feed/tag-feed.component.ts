import { UserService } from './../services/user.service';
import { ArticleService } from './../services/article.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.css']
})
export class TagFeedComponent implements OnInit {
  articles: any;
  params: any;
  isAuth: boolean;

  constructor(private articleService: ArticleService,
              private userService: UserService, private route: ActivatedRoute) {
  }

  likeArticle(article) {
    if ( !article.favorited ) {
      this.articleService.likeArticle(article.slug).pipe(map(res => res.json())).subscribe(data => {

        (this.articles.find(x => (x as any).slug === data.article.slug) as any).favorited = true;
        (this.articles.find(x => (x as any).slug === data.article.slug) as any).favoritesCount++;
      });
    } else {
      this.articleService.unlikeArticle(article.slug).pipe(map(res => res)).subscribe((data: any) => {
        console.log(data);

        (this.articles.find(x => (x as any).slug === data.article.slug) as any).favorited = false;
        (this.articles.find(x => (x as any).slug === data.article.slug) as any).favoritesCount--;
      });
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.params = params;
      this.articleService.getAllArticlesByTag(params.get('id')).subscribe(data => {
        this.articles = data;
      });
    });
    this.userService.isAuthenticated.subscribe(data => this.isAuth = data);
  }
}
