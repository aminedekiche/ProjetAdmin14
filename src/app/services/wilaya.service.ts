import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { WilayaDto } from '../models/wilaya';

@Injectable({
  providedIn: 'root'
})
export class WilayaService {

  private  baseUrl : string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllWilayaservice():Observable<WilayaDto[]>{
    return this.http.get<WilayaDto[]>(this.baseUrl + '/api/Wilayas'); // : Observable<Users[]> <Users[]>
  }

  /*addUserservice(addEmployeeRequest:UserDto) : Observable<UserDto>{
    
    return this.http.post<UserDto>(this.baseUrl + '/api/Users',addEmployeeRequest);
  }

  getUserdetailsservice(PkId : string) : Observable<UserDto>{
    
    return this.http.get<UserDto>(this.baseUrl + '/api/Users/'+ PkId);
  }
  

  updateUserservice(PkId : string, updateEmployee: UserDto) : Observable<UserDto>{
    
    return this.http.put<UserDto>(this.baseUrl + '/api/Users/'+ PkId, updateEmployee);
  }

  deleteUserservice(PkId : string) : Observable<UserDto>{
    
    return this.http.delete<UserDto>(this.baseUrl + '/api/Users/'+ PkId);
  }*/
}
