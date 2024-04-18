import { Injectable, numberAttribute } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  

// public eventexperiment: EventEmitter<any> = new EventEmitter();
private apiUrl =`${environment.apiUrl}/login`
// private stuUrl=`${environment.apiUrl}/signup`
constructor(private http:HttpClient) {
  let data=123
 }
getUser(_userCredentials: any){
  return this.http.post(this.apiUrl,_userCredentials);
}
// getstudents(){
//   return this.http.get(this.stuUrl);
// }
// poststudent(data: { rollno: number; name: string; class: string; }){
//   console.log("post data",data)
//   return this.http.post(this.stuUrl,data);
// }
}
