import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
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
  isAuth: boolean;
  constructor(private userService: UserService, private tagService: TagsService, private router: Router) {
  }

  tagFeeds(tag: string) {
    console.log(tag);

    this.router.navigate(['./tag/' + tag]);
  }
  ngOnInit() {
    this.userService.isAuthenticated.subscribe(data => this.isAuth = data);
    this.tagService.getTags().pipe(map(res => res.json().tags)).subscribe(data => this.tags = data);
  }

}
