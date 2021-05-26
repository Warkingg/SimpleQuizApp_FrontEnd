import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = "";
  id = -1;
  userForm: FormGroup = new FormGroup({
    username: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    password: new FormControl(),
    rePassword: new FormControl(),
    phoneNumber: new FormControl(),
    email: new FormControl()
  });
  constructor(private activatedRouter: ActivatedRoute,
              private loginService : LoginService) {
    this.activatedRouter.paramMap.subscribe(paramMap =>{
      const id = +paramMap.get("id");
      this.getUserById(id);
    })
  }

  ngOnInit(): void {
  }
  getUserById(id:number){
    this.loginService.getProfile(id).subscribe(user=>{
      this.userForm = new FormGroup({
        username: new FormControl(user.username),
        firstName: new FormControl(user.firstName),
        lastName: new FormControl(user.lastName),
        password: new FormControl(user.password),
        // rePassword: new FormControl(user.rePassword),
        phoneNumber: new FormControl(user.phoneNumber),
        email: new FormControl(user.email)
      })
      this.username = user.username;
      this.id = user.id;
    })
  }
}
