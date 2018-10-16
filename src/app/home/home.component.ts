import { TagsService } from './../services/tags.service';
import { Component, OnInit } from '@angular/core';
import { map } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tags: any;
  constructor(private tagService: TagsService) {
  }

  ngOnInit() {
    this.tagService.getTags().pipe(map(res => res.json().tags)).subscribe(data => this.tags = data);
  }

}
