import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { contacts } from '../models/model';
import { BehaviorSubject, Observable, pluck } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private baseUrl =`${environment.apiUrl}/api`
  public currentContact$: BehaviorSubject<contacts>;
  constructor(private http:HttpClient) {
    this.currentContact$ = new BehaviorSubject<contacts>({ id: 0, name: '', image: '',isGroup:false,participants:2 });

   }
   getContacts(){
    return this.http.get(this.baseUrl + '/contact/list');
  }
  currentContact(data:contacts){
    console.log("current contact is running")
    // let data:contacts={
    //   id:1,
    //   name:'Testing',
    //   image:'photooooo'
    // }
    this.currentContact$.next(data);
  }
  getMessages(chatId : any){
    return this.http.get(this.baseUrl + '/messages/list/' + chatId);
  }
  // getItems(c:contacts[]): Observable<contacts[]> {
  //   return this.shoppingCart$.pipe(
  //     pluck('contact')
  //   );
  // }
}
