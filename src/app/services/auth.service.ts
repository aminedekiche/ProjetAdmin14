import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  baseUrl : string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  Signup(userObjet : any){
    return this.http.post<any>(this.baseUrl + '/api/Users/registre', userObjet); // : Observable<Users[]> <Users[]>
  }

  Signin(userObjet : any){
    return this.http.post<any>(this.baseUrl + '/api/Users/authentificate', userObjet); // : Observable<Users[]> <Users[]>
  }

  Storetoken(tokenvalue : string){
    
    localStorage.setItem('token', tokenvalue);
  }

  Storeusertoken(tokenvalue : string){
    
    localStorage.setItem('user', tokenvalue);
  }

  getusertoken(){

    var x = localStorage.getItem("user");
    
     return x;
  }

  Islogged():boolean{
    
    return !!localStorage.getItem('token');
  }
  
}
