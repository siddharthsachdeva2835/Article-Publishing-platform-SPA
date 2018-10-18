import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  tagList = [];
  constructor(private articleService: ArticleService) {
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
    this.articleService.addArticle(obj);
  }

  ngOnInit() {
  }

}
