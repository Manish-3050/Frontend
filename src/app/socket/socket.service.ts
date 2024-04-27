import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: any;
  baseUrl = 'http://localhost:3000';
  constructor() {
    // this.initSocket('manish')
   }

  initSocket(data :any) {
    this.socket = io(this.baseUrl, {
      query: data,
      'forceNew': true,
      'reconnection': true,
      'reconnectionDelay': 1000,
      'reconnectionDelayMax': 5000,
      'reconnectionAttempts': Infinity,
      secure: true
    });
    this.socket.on('connect', (data:any) => {
      console.log('socket connected',this.socket.id);
    });
    this.socket.on('disconnect', function () {
      console.log('client disconnected from server socket');
    });
    this.socketEvents().subscribe(
    (event: any) => {

      console.log(' socketEvents socketEvents:', event);
    });
  }

  destroySocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  sendNewMessage(socketData:any){
    this.socket.emit('NEW_MESSAGE', socketData);
  }
  sendNewMessageInGroup(socketData:any){
    this.socket.emit('NEW_MESSAGE_IN_GROUP', socketData);
  }
  joinGroup(){
    this.socket.emit('JOIN_GROUP')
  }


  socketEvents = () => {
    return Observable.create((observer:any) => {
      if(this.socket){
        this.socket.on('NEW_THREAD', (data:any) => {
          observer.next({ name: 'NEW_THREAD', data: data });
        });
        this.socket.on('NEW_MESSAGE', (data:any) => {
        console.log('data @@@@@@@@@@@:', data);
           observer.next({ name: 'NEW_MESSAGE', data: data });
        });
        // this.socket.on('NEW_MESSAGE_IN_GROUP', (data:any) => {
        //   console.log('data @@@@@@@@@@@:', data);
        //     //  observer.next({ name: 'NEW_MESSAGE', data: data });
        //   });
        this.socket.on('EDIT_MESSAGE', (data:any) => {
          observer.next({ name: 'EDIT_MESSAGE', data: data });
        });
        this.socket.on('DELETE_MESSAGE', (data:any) => {
          observer.next({ name: 'DELETE_MESSAGE', data: data });
        });
        this.socket.on('TYPING_ON', (data:any) => {
          observer.next({ name: 'TYPING_ON', data: data });
        });
        this.socket.on('TYPING_OFF', (data:any) => {
          observer.next({ name: 'TYPING_OFF', data: data });
        });
        this.socket.on('ONLINE', (data:any) => {
          observer.next({ name: 'ONLINE', data: data });
        });
        this.socket.on('OFFLINE', (data:any) => {
          observer.next({ name: 'OFFLINE', data: data });
        });
        this.socket.on('MESSAGE_SEEN', (data:any) => {
          observer.next({ name: 'MESSAGE_SEEN', data: data });
        });
        this.socket.on('NEW_NOTIFICATION', (data:any) => {
          observer.next({ name: 'NEW_NOTIFICATION', data: data });
        });
      }
    });
 
  }


}
