import { UserService } from './../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  comments = [{ author: { username: ''}, body: '', id: 0}];
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
  currentUser: any;
  constructor(private articleService: ArticleService
                , private activatedRoute: ActivatedRoute
                  , private userService: UserService
                    , private router: Router) { }


  editArticle() {
    this.router.navigate(['update/' + this.article.slug]);
  }

  addComment() {
    this.articleService.addComment(this.addcomment, this.article.slug).pipe(map(res => res.json())).subscribe(data => {
      this.articleService.getComments(this.activatedRoute.snapshot.paramMap.get('slug'))
      .subscribe(dataa => {
        this.comments = dataa.comments;
        console.log(this.comments);
      });
    });
  }

  deleteComment(id) {
    console.log(id);

    this.articleService.deleteComment(id, this.article.slug)
    .subscribe(data => {
      this.articleService.getComments(this.activatedRoute.snapshot.paramMap.get('slug'))
      .subscribe(dataa => {
        this.comments = dataa.comments;
        console.log(this.comments);
      });
    });
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.article.slug).subscribe(
      () => {},
      () => {},
      () => { this.router.navigate(['home/global']); }
    );
  }

  likeArticle() {
    if ( !this.article.favorited ) {
      this.articleService.likeArticle(this.article.slug).pipe(map(res => res.json())).subscribe(data => {
      this.article.favorited = true;
      this.article.favoritesCount++;
      });
    } else {
      this.articleService.unlikeArticle(this.article.slug).subscribe(data => {
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
      this.userService.unfollowAuthor(this.article.author.username).subscribe(data => {
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
    this.userService.currentUser.subscribe(data => this.currentUser = data);
  }

}
