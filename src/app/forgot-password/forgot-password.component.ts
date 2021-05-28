import { Component, OnInit } from '@angular/core';
import {ForgotPasswordService} from '../service/forgot-password.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import Swal from "sweetalert2/dist/sweetalert2.js"

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
      let timerInterval
      Swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getHtmlContainer()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          alert('Success')
        }
      })
    }, () => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: "Fail to Login",
        showConfirmButton: false,
        timer: 1500
      })
    });
  }
}
