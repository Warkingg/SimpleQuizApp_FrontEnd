import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {UserToken} from '../model/user-token';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../service/login.service';
import {ChangePasswordService} from '../service/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentUser: User;
  userFirstName = '';
  currentUserToken: UserToken;
  userLastName = '';
  userPhoneNumber = '';
  userEmail = '1';
  newPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  });
  constructor(private changePassword: ChangePasswordService,
              private router: Router,
              private loginService: LoginService) {
    this.loginService.currentUser.subscribe(
      currentUser => {
        this.currentUser = currentUser;
        this.currentUserToken = currentUser;
      }
    );
  }

  ngOnInit() {
  }
  updatePassword() {
    const user = this.setNewUser();
    this.changePassword.newPassword(user, this.currentUser.id).subscribe(() => {
      alert('Đổi mật khẩu thành công');
      this.newPasswordForm.reset();
      this.router.navigate(['/login']);
    }, err => {
      alert("thất bại")
    });
    console.log(user);
  }

  private setNewUser() {
    const user: User = {
      password: this.newPasswordForm.value.password,
      confirmPassword: this.newPasswordForm.value.confirmPassword,
      firstName: this.userFirstName,
      lastName: this.userLastName,
      email: this.userEmail,
      phoneNumber: this.userPhoneNumber,
    };
    return user;
  }

}
