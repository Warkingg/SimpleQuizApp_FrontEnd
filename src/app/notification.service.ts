import { Injectable } from '@angular/core';
declare var Swal:any;
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
   Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  constructor() { }

  showSuccessPopup(icon: string, message:string){
    this.Toast.fire({
      icon: icon,
      title: message
    })
  }
}
