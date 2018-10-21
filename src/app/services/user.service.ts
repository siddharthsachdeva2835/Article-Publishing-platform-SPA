import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { Injectable, OnInit } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  constructor(private api: ApiService, private jwt: JwtService) { }
  articles: any;

  populate() {
    if (this.jwt.getToken()) {
      this.api.getRequest('/user', { headers: {Authorization: 'Token ' +  this.jwt.getToken()}})
      .pipe(map(res => res.json()))
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  followAuthor(username) {
    return this.api.postRequest(`/profiles/${username}/follow`, {}, { headers: {Authorization: 'Token ' +  this.jwt.getToken()}});
  }

  unfollowAuthor(username) {
    return this.api.deleteRequest(`/profiles/${username}/follow`, {}, { headers: {Authorization: 'Token ' +  this.jwt.getToken()}});
  }

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

  setAuth (user) {
    this.jwt.saveToken(user.token);
    console.log(this.jwt.getToken());

    console.log(user);
    this.currentUserSubject.next(user);

    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth () {
    this.jwt.deleteToken();
    console.log(this.jwt.getToken());

    this.currentUserSubject.next({} as User);

    this.isAuthenticatedSubject.next(false);
  }

  ngOnInit() { }
}
