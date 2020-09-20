import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  userData = {
    username: '',
    password: ''
  }
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  checkLogin() {
    if (this.userData.username == "admin" && this.userData.password == "1234") {
      this.router.navigate(['dashboard']);
    } else {
      alert("Username invalid");
    }
  }
}
