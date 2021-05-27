import { Component, OnInit } from '@angular/core';
import {LoginService} from '../service/login.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js'
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
              private router: Router) { }

  ngOnInit() {
  }
  login(){
    this.loginService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(data => {
          this.router.navigateByUrl('/home');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "Successfully Login",
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl('/home');
        },

        error => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "Fail to Login",
            showConfirmButton: false,
            timer: 1500
          })
          this.loading = false;
        });
    this.checkLogin != this.checkLogin;
  }
}
