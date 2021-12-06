import { apiEndPoint } from './apiUrl';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  apiEndPoint = apiEndPoint+"/api/employees";

  constructor(private http:HttpClient) { }

  getData():Observable<any> {
    return this.http.get(this.apiEndPoint)
  }
  postData(data:any):Observable<any>{
    return this.http.post(this.apiEndPoint,data);
  }
  
  puttData(data:any):Observable<any>{
    return this.http.put(this.apiEndPoint,data)
  }

  deleteData(id:number):Observable<any>{
    return this.http.delete(this.apiEndPoint+`/${id}`)
  }

  //reading roles from api
  getRoles():Observable<any>{
    return this.http.get(this.apiEndPoint+"/Roles")
  }

  //reading gender from api
  getGender():Observable<any>{
    return this.http.get(this.apiEndPoint+"/Gender")
  }
  
  //reading citites from api
  getCity():Observable<any>{
    return this.http.get(this.apiEndPoint+"/City")
  }
}
