import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ForgotPassword} from '../model/forgot-password';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http:HttpClient) { }
  passwordForgot(forgotPassword: ForgotPassword): Observable<ForgotPassword> {
    return this.http.post<ForgotPassword>(`${API_URL}/forgot-password`, forgotPassword);
  }
}
