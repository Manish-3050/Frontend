import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private baseUrl =`${environment.apiUrl}/edit`
  
  constructor(private http:HttpClient) { }
  addProducts(products:any){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(products);
    return this.http.post(this.baseUrl, body,{'headers':headers , observe: 'response'})
  }
}
