import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {LoginService} from '../service/login.service';
import {UserToken} from '../model/user-token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adminUsername = '';
  userUsername = '';
  currentUser: UserToken;
  constructor(private userService: UserService,
              private loginService : LoginService,
              private router : Router) {
    this.loginService.currentUser.subscribe(value => {
      this.currentUser = value;
    })
  }

  ngOnInit(): void {
  }

  adminLogin(adminUsername) {
    if(adminUsername==="admin") {
      window.location.replace("/questions");
    } else {
      alert('Please enter correct username')
    }
  }
  userLogin(userUsername) {
    console.log(userUsername.length)
    if(userUsername.length < 2) {
      alert('Please enter correct username')
    } else {
      this.userService.saveUsername(userUsername);
       window.location.replace(`/history/${userUsername}`);
    }
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
