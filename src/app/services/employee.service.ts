
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employees } from '../models/employees.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private  baseUrl : string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllEmployees() : Observable<Employees[]>{
    return this.http.get<Employees[]>(this.baseUrl + '/api/employees');
  }

  addEmployee(addEmployeeRequest:Employees) : Observable<Employees>{
    addEmployeeRequest.id='00000000-0000-0000-0000-000000000000';
    return this.http.post<Employees>(this.baseUrl + '/api/employees',addEmployeeRequest);
  }

  getEmployee(id : string) : Observable<Employees>{
    
    return this.http.get<Employees>(this.baseUrl + '/api/employees/'+ id);
  }

  updateEmployee(id : string, updateEmployee: Employees) : Observable<Employees>{
    
    return this.http.put<Employees>(this.baseUrl + '/api/employees/'+ id, updateEmployee);
  }

  deleteEmployee(id : string) : Observable<Employees>{
    
    return this.http.delete<Employees>(this.baseUrl + '/api/employees/'+ id);
  }

}
