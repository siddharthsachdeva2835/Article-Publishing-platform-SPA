import { ApiService } from './api.service';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  constructor(private api: ApiService) { }
  articles: any;

  authUser(email: string, password: string) {
    const obj = {
      user: {
        email: email,
        password: password
      }
    };
    console.log(obj);
    return this.api.postRequest('/users/login', obj).pipe(map(res => res.json()));
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
