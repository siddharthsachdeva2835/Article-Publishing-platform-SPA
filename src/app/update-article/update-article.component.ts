import { ActivatedRoute } from '@angular/router';
import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  tagList = [];
  article: any;
  constructor(private articleService: ArticleService, 
                private activatedRoute: ActivatedRoute) {
   }

  articleForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl(''),
    tag: new FormControl('')
  });

  addTag(e) {
    if (e.keyCode === 32) {
      this.tagList.push(this.articleForm.value.tag);
      this.articleForm.patchValue({tag: ''});
    }
  }

  removeTag(tag) {
    this.tagList.splice(this.tagList.indexOf(tag), 1);
  }

  onSubmit() {
    const obj = {
      article: {
        title: this.articleForm.value.title,
        description: this.articleForm.value.description,
        body: this.articleForm.value.body,
        tagList: this.tagList
      }
    };
    this.articleService.updateArticle(this.article.slug, obj);
  }

  ngOnInit() {
    this.articleService.getArticle(this.activatedRoute.snapshot.paramMap.get('slug'))
                .subscribe(data => {
                  this.article = data.article;
                  this.articleForm.setValue({title: this.article.title, description: this.article.description, 
                                              body: this.article.body, tag: ''});
                  for (const tag of this.article.tagList) {
                    this.tagList.push(tag);
                    console.log(tag);
                  }
                });
  }
}
