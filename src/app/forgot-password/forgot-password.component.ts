import { Component, OnInit } from '@angular/core';
import {ForgotPasswordService} from '../service/forgot-password.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('')
  });
  isSubmitted = false;
  constructor(private forgotPassword: ForgotPasswordService,
              private router : Router) { }

  ngOnInit() {
  }
  passwordForgot() {
    this.isSubmitted = true;
    this.forgotPassword.passwordForgot(this.forgotPasswordForm.value).subscribe(() => {
      this.forgotPasswordForm.reset();
      alert("thành công")
    }, () => {
      alert("thất bại")
    });
  }
}
