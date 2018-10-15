import { ApiService } from './api.service';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  constructor(private api: ApiService) { }
  articles: any;

  authUser(email: string, password: string) {
    this.api.getRequest('/articles').subscribe(services => services.json());
  }

  registerUser(username: string, email: string, password: string) {
    const obj = {
      user: {
        username: username,
        email: email,
        password: password
      }
    };
    this.api.postRequest('/users', obj).subscribe(user => console.log(user));
  }

  ngOnInit() {
  }
}
