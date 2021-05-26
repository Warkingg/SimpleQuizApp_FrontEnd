import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { RegisterComponent } from '../register/register.component';
import {UserService} from '../service/user.service';
import {LoginService} from '../service/login.service';
import {Router} from '@angular/router';
import {UserToken} from '../model/user-token';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dialogRef: any;
  currentUser: UserToken;
  constructor(private dialog: MatDialog,
              private userService: UserService,
              private loginService : LoginService,
              private router : Router) {
    this.loginService.currentUser.subscribe(value => {
      this.currentUser = value;
    })
  }

    // tslint:disable-next-line: typedef
    public openRegister() {
    this.dialogRef = this.dialog.open(RegisterComponent, {
      width: '420px'
    });
  }
  ngOnInit(): void {
  }

}
