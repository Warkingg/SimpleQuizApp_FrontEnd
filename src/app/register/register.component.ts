import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../service/register.service';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {};
  constructor(private registerService : RegisterService,
              private router :Router) { }

  ngOnInit(): void {
  }


  signup(form: NgForm) {
    let user = form.value;
    this.registerService.register(user).subscribe(abc=>{
      this.router.navigate(['/login']);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Successfully Registration",
        showConfirmButton: false,
        timer: 1500
      })
    },error => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: "Fail to Registration",
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
