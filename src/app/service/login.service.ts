import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {map} from 'rxjs/operators';
import {UserToken} from '../model/user-token';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserSubject: BehaviorSubject<UserToken>;
  currentUser: Observable<UserToken>;
  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  login(user:User):Observable<User>{
    return this.http.post<User>(`${API_URL}/api/login`, user).pipe(map(user=>{
      localStorage.setItem("user", JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }))
  }

  getProfile(id:number):Observable<User>{
    return this.http.get<User>(`${API_URL}/api/users/${id}`)
  }

  logout(){
    localStorage.removeItem('user');

  }

  // passwordForgot(forgotPassword: ForgotPassword): Observable<ForgotPassword> {
  //   return this.http.post<ForgotPassword>(`${API_URL}/forgot-password`, forgotPassword);
  // }
}
