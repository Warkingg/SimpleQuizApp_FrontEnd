import { Component, OnInit } from '@angular/core';
import {UserToken} from '../model/user-token';
import {Router} from '@angular/router';
import {LoginService} from '../service/login.service';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {
  currentUser: UserToken;
  constructor(  private router :Router,
                private loginService :LoginService) {
    this.loginService.currentUser.subscribe(value => {
      this.currentUser = value;

    })

  }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
