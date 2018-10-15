import { JwtService } from './../../services/jwt.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private jwt: JwtService) {
  }

  logout() {
    this.jwt.deleteToken();
    console.log(this.jwt.getToken());
  }

  ngOnInit() {
  }

}


