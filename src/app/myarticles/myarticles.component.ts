import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../services/user.service';
import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-myarticles',
  templateUrl: './myarticles.component.html',
  styleUrls: ['./myarticles.component.css']
})
export class MyarticlesComponent implements OnInit {

  articles: Array<object>;
  date: Date;
  dateString: string;
  isAuth: boolean;
  currentUser: any;
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
      this.articleService.unlikeArticle(article.slug).pipe(map(res => res)).subscribe((data: any) => {
        (this.articles.find(x => (x as any).slug === data.article.slug) as any).favorited = false;
        (this.articles.find(x => (x as any).slug === data.article.slug) as any).favoritesCount--;
      });
    }
  }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(data => this.isAuth = data);
    this.articleService.getMyArticles(this.activatedRoute.snapshot.paramMap.get('username')).subscribe(art => {
      this.articles = art;
      console.log(this.articles);
    });
  }
}
