import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthReponseData } from '../models/authResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  public register(email:String, password:String){
    return this.http.post<AuthReponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyiZQVovmoAYC5FhFj9hHpdAw9Up48pKo',{
      email:email,
      password:password,
      returnSecureToken:true
    })
  }
}
