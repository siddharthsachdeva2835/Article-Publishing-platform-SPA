import { UserService } from './../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  comments = [{body: ''}];
  article = {
    author: {
      bio: '',
      following: false,
      image: '',
      username: ''
    },
    body: '',
    createdAt: '',
    description: '',
    favorited: false,
    favoritesCount: 0,
    slug: '',
    tagList: [],
    title: ''
  };
  isAuth: boolean;
  addcomment: string;
  constructor(private articleService: ArticleService
                , private activatedRoute: ActivatedRoute
                  , private userService: UserService) { }


    addComment() {
      this.articleService.addComment(this.addcomment, this.article.slug).pipe(map(res => res.json())).subscribe(data => {
        this.articleService.getComments(this.activatedRoute.snapshot.paramMap.get('slug'))
        .subscribe(dataa => {
          this.comments = dataa.comments;
          console.log(this.comments);
        });
      });
    }

  likeArticle() {
    if ( !this.article.favorited ) {
      this.articleService.likeArticle(this.article.slug).pipe(map(res => res.json())).subscribe(data => {
      this.article.favorited = true;
      this.article.favoritesCount++;
      });
    } else {
      this.articleService.unlikeArticle(this.article.slug).pipe(map(res => res.json())).subscribe(data => {
        this.article.favorited = false;
        this.article.favoritesCount--;
      });
    }
  }

  followAuthor() {
    if ( !this.article.author.following ) {
      this.userService.followAuthor(this.article.author.username).pipe(map(res => res.json())).subscribe(data => {
      this.article.author.following = true;
      });
    } else {
      this.userService.unfollowAuthor(this.article.author.username).pipe(map(res => res.json())).subscribe(data => {
        this.article.author.following = false;
      });
    }
  }

  ngOnInit() {
    this.articleService.getArticle(this.activatedRoute.snapshot.paramMap.get('slug'))
                .subscribe(data => {
                  this.article = data.article;
                  console.log(this.article);
                });
    this.articleService.getComments(this.activatedRoute.snapshot.paramMap.get('slug'))
    .subscribe(data => {
      this.comments = data.comments;
      console.log(this.comments);
    });
    this.userService.isAuthenticated.subscribe(data => this.isAuth = data);
  }

}
