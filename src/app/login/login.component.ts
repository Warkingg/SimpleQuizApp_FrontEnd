import { Component, OnInit } from '@angular/core';
import {LoginService} from '../service/login.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import {NotificationService} from '../notification.service';
declare var $:any;
declare var Swal:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  checkLogin = false;
  error = '';
  loading = false;
  constructor(private loginService : LoginService,
              private router: Router,
              private notification :NotificationService
  ) { }

  ngOnInit() {
  }
  login(){
    this.loginService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(data => {
          this.router.navigateByUrl('/home');
          this.notification.showSuccessPopup('success','Success Login')
        },
        error => {
          this.notification.showSuccessPopup('error','Fail Login')
          this.loading = false;
        });
    this.checkLogin != this.checkLogin;
  }

  show() {

  }
  }
