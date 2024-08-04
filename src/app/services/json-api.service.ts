import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonApiService {

  constructor(private httpclient:HttpClient) { }

  postproduct(data : any){
    return this.httpclient.post<any>("http://localhost:3000/posts/", data);
  }


}
