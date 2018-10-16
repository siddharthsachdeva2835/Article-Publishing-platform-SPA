import { UserService } from './../../services/user.service';
import { ApiService } from './../../services/api.service';
import { JwtService } from './../../services/jwt.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  constructor(private userService: UserService, private jwt: JwtService) {
    this.isAuth = false;
  }

  logout() {
    this.userService.purgeAuth();
  }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(data => this.isAuth = data);
  }

}


