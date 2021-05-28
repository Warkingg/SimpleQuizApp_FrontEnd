import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../service/register.service';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NotificationService} from '../notification.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {};
  constructor(private registerService : RegisterService,
              private router :Router,
              private notification : NotificationService) { }

  ngOnInit(): void {
  }


  signup(form: NgForm) {
    let user = form.value;
    this.registerService.register(user).subscribe(abc=>{
      this.router.navigate(['/login']);
      this.notification.showSuccessPopup("success", "Success Register")
    },error => {
      this.notification.showSuccessPopup("error", "Success Register")
    })
  }
}
