import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthResponseData } from '../models/authResponseData';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn=false;
  public user?:AuthResponseData;

  constructor(private http:HttpClient) { }

  public register(email:String,password:String){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyiZQVovmoAYC5FhFj9hHpdAw9Up48pKo',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(  tap(  (response)=>{
      this.isLoggedIn=true;
      this.user=response;
    }));
  }

  public login(email:String,password:String){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyiZQVovmoAYC5FhFj9hHpdAw9Up48pKo',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(  tap(  (response)=>{
      this.isLoggedIn=true;
      this.user=response;
    }));
  }

  public logout(){
    this.isLoggedIn=false;
    this.user=undefined;
  }

}

// AIzaSyCyiZQVovmoAYC5FhFj9hHpdAw9Up48pKo
