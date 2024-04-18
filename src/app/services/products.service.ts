import { EventEmitter, Injectable, Output, computed, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public data=signal(10)
// public eventexperiment: EventEmitter<any> = new EventEmitter();
  private apiUrl =`${environment.apiUrl}/pizzas`
  private stuUrl=`${environment.apiUrl}/signup`
  private addpizzas=`${environment.apiUrl}/addpizza`

  constructor(private http:HttpClient) { }
  updateData(val:number){
   console.log("coming from update button",val)
    // this.data.mutate((res)=>{
    //   res=data
    // });
    this.data.set(val)
    console.log("data from service ",this.data)
  }
  getproducts(){
    return this.http.get(this.apiUrl);
  }
  getstudents(){
    return this.http.get(this.stuUrl);
  }
  poststudent(data: { rollno: number; name: string; class: string; }){
    console.log("post data",data)
    return this.http.post(this.stuUrl,data);
  }
  addpizza(data:any){
    return this.http.post(this.addpizzas,data);
  }
}
