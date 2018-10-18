import { JwtService } from './../../services/jwt.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private jwt: JwtService , private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    this.userService.authUser(this.loginForm.value.email, this.loginForm.value.password)
                          .subscribe(obj => {
                            this.userService.setAuth(obj.user);
                            this.router.navigate(['home/global']);
                          });
  }

  ngOnInit() {
  }

}
