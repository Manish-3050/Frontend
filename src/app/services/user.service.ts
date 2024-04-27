import { Injectable } from '@angular/core';
import { userDatatype } from '../models/model';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { contacts } from '../models/model';
import { BehaviorSubject, Observable, pluck } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl =`${environment.apiUrl}/api`
  public userData$: BehaviorSubject<userDatatype>;
  constructor(
  private http:HttpClient,
  ) {
    this.userData$ = new BehaviorSubject<userDatatype>({ id: 0, firstName: '', lastName: '',avtar:'' });
   }

   login(data:any){
    return this.http.post(this.baseUrl + '/user/login',data);
  }
}
