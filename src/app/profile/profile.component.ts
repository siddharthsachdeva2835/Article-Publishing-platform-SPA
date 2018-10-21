import { ActivatedRoute } from '@angular/router';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  toggle = true;
  profile = {
    bio: null,
    following: false,
    image: '',
    username: ''
  };
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getProfile(this.activatedRoute.snapshot.paramMap.get('username')).subscribe(data => {
      this.profile = data.profile;
      console.log(this.profile);
    });
  }
}
